from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from models.chat import ChatMessage,ResultResponse
from modules.openai import compare_promt

from starlette.requests import Request
import json


app = FastAPI()
# Add CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/compare",response_model=ResultResponse)
async def chat_response(chat_message: ChatMessage):
    response = compare_promt(chat_message.promt_one,chat_message.promt_two,chat_message.user_queries)
    return response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
