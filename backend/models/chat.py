from pydantic import BaseModel
from datetime import time

# Chat message model
class ChatMessage(BaseModel):
    promt_one: str
    promt_two: str
    user_queries : list[str]



class PromptResponse(BaseModel):
    time: float 
    input_token: int
    output_token: int
    query : str
    response : str

class ComparedResponse(BaseModel):
    result_promt_one: PromptResponse
    result_promt_two: PromptResponse

class ResultResponse(BaseModel):
    compared_response: list[ComparedResponse]
    average_latancy_one : int
    average_in_token_one : int
    average_out_token_one : int
    average_latancy_two : int
    average_in_token_two : int
    average_out_token_two : int