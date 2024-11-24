import openai
import os
import json
from string import Template
from loguru import logger
from models.chat import ComparedResponse,PromptResponse,ResultResponse
from datetime import datetime
import pprint

openai.api_key = os.getenv("OPENAI_API_KEY")  # Set your OpenAI API key from environment variable


def compare_promt(promt_one,prompt_two,user_queries) -> ResultResponse:
    comparedResponses = []
    sum_latancy_one = 0
    sum_in_token_one = 0
    sum_out_token_one = 0
    sum_latancy_two = 0
    sum_in_token_two = 0
    sum_out_token_two = 0
    l = len(user_queries)
    for query in user_queries:
        promt_one_as = Template(promt_one).safe_substitute(
            query = query,
        )
        prompt_two_as = Template(prompt_two).safe_substitute(
            query = query,
        )
        logger.info(f'Promt {promt_one} : {prompt_two}')
        response_one = openai_call(promt_one_as)
        response_two = openai_call(prompt_two_as)
        sum_latancy_one += response_one.time
        sum_in_token_one += response_one.input_token
        sum_out_token_one += response_one.output_token
        sum_latancy_two += response_two.time
        sum_in_token_two += response_two.input_token
        sum_out_token_two += response_two.output_token
        logger.info(f"Data : {response_one}, {response_two}")
        comparedResponse = ComparedResponse(result_promt_one = response_one,result_promt_two = response_two)
        comparedResponses.append(comparedResponse)
    return ResultResponse(
        compared_response=comparedResponses,
        average_latancy_one=int(sum_latancy_one / l),
        average_in_token_one=int(sum_in_token_one / l),
        average_out_token_one=int(sum_out_token_one / l),
        average_latancy_two=int(sum_latancy_two / l),
        average_in_token_two=int(sum_in_token_two / l),
        average_out_token_two=int(sum_out_token_two / l)
    )

     

def openai_call(prompt) -> PromptResponse:
            # Call the OpenAI API with the provided message
        start_time = datetime.now()
        response = openai.chat.completions.create(
            model="gpt-4o-mini",  # Specify the model
            messages=[{"role": "user", "content": prompt}],
            stream=False,
        )
        end_time = datetime.now()
        pprint.pprint(response)
        response_message = response.choices[0].message.content  # Directly extract the response message
        promptResponse = PromptResponse(time = (end_time - start_time).total_seconds()*1000, input_token=response.usage.prompt_tokens,output_token = response.usage.completion_tokens,query=prompt,response = response_message)
        return promptResponse