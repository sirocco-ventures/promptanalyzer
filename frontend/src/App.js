import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [promptOne, setPromptOne] = useState('');
    const [promptTwo, setPromptTwo] = useState('');
    const [newUserQuery, setNewUserQuery] = useState('');
    const [userQueries, setUserQueries] = useState([]);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [llmModel, setllmModel] = useState('');
    const [apiKey, setapiKey] = useState('');

    const runComparison = async (promptOne, promptTwo, userQueries,llmModel,apiKey) => {
        const inputData = {
            promt_one: promptOne,
            promt_two: promptTwo,
            user_queries: userQueries,
            llmModel : llmModel,
            apiKey : apiKey
        };

        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:8080/compare`, inputData);
            if (response.status === 200) {
                console.log('Comparison result:', response.data);
                setResult(response.data);
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error during comparison:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRunComparison = () => {
        runComparison(promptOne, promptTwo, userQueries);
    };

    return (
        <div class="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
            <div class="layout-container flex h-full grow flex-col">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0d141c]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_535)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_6_535">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]">LLM Prompt Analyzer</h2>
      </div>
      
    </header>

    <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
            <h2 class="text-[#0d141c] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Compare and evaluate LLM System prompts</h2>
            <div class="flex flex-col p-4">
              

            <details class="flex flex-col border-t border-t-[#cedbe8] py-2 group" open="">
                <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p class="text-[#0d141c] text-[18px] leading-tight tracking-[-0.015em] px-2 pb-3 pt-5">OpenAI Credentials</p>
                  <div class="text-[#0d141c] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </summary>
                <div class="flex flex-col">
                    <div class="flex items-end gap-4 px-4 py-3">
                        <label class="flex flex-col min-w-40 flex-1">
                        <p class="text-[#49719c] text-base font-medium leading-normal line-clamp-1 pl-2 pb-2">Select Model</p>
                            <select 
                                class="form-input flex w-full min-w-0 flex-1 rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border border-[#cedbe8] bg-slate-50 focus:border-[#cedbe8] placeholder:text-[#49719c] p-[15px] text-base font-normal leading-normal" 
                                value={llmModel} 
                                onChange={(e) => setllmModel(e.target.value)}
                            >
                                <option value="">Select a model</option>
                                <option value="GPT-4o">GPT-4o</option>
                                <option value="GPT-4o mini">GPT-4o mini</option>
                                <option value="o1-preview">o1-preview</option>
                                <option value="o1-mini">o1-mini</option>
                                <option value="GPT-4 Turbo">GPT-4 Turbo</option>
                                <option value="GPT-4">GPT-4</option>
                                <option value="GPT-3.5 Turbo">GPT-3.5 Turbo</option>
                            </select>
                        </label>
                    </div>
                    <div class="flex items-end gap-4 px-4 py-3">
                        <label class="flex flex-col min-w-40 flex-1">
                        <p class="text-[#49719c] text-base font-medium leading-normal line-clamp-1 pl-2 pb-2">API Key</p>
                        <input type="password" class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border border-[#cedbe8] bg-slate-50 focus:border-[#cedbe8] placeholder:text-[#49719c] p-[15px] text-base font-normal leading-normal" value={apiKey} onChange={(e) => setapiKey(e.target.value)}></input>
                        </label>
                    </div>
                </div>
              </details>
              
              <details class="flex flex-col border-t border-t-[#cedbe8] py-2 group" open="">
                <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p class="text-[#0d141c] text-[18px] leading-tight tracking-[-0.015em] px-2 pb-3 pt-5">System Promts</p>
                  <div class="text-[#0d141c] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </summary>
                <div class="flex">
                    <div class="flex flex-1 items-end gap-4 px-4 py-3">
                        <label class="flex flex-col min-w-40 flex-1">
                        <p class="text-[#49719c] text-base font-medium leading-normal line-clamp-1 pl-2 pb-2">System promt one</p>
                            <textarea class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border border-[#cedbe8] bg-slate-50 focus:border-[#cedbe8] min-h-36 placeholder:text-[#49719c] p-[15px] text-base font-normal leading-normal" value={promptOne} onChange={(e) => setPromptOne(e.target.value)}></textarea>
                        </label>
                    </div>
                    <div class="flex flex-1 items-end gap-4 px-4 py-3">
                        <label class="flex flex-col min-w-40 flex-1">
                        <p class="text-[#49719c] text-base font-medium leading-normal line-clamp-1 pl-2 pb-2">System promt two</p>
                            <textarea class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border border-[#cedbe8] bg-slate-50 focus:border-[#cedbe8] min-h-36 placeholder:text-[#49719c] p-[15px] text-base font-normal leading-normal" value={promptTwo} onChange={(e) => setPromptTwo(e.target.value)}></textarea>
                        </label>
                    </div>
                </div>
              </details>


              <details class="flex flex-col border-t border-t-[#cedbe8] py-2 group" open="">
                <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
                <p class="text-[#0d141c] text-[18px] leading-tight tracking-[-0.015em] px-2 pb-3 pt-5">User queries</p>
                  <div class="text-[#0d141c] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </summary>
                <div class="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2">
                <div class="flex flex-col justify-center flex-1">
                    {userQueries.length > 0 ? (
                        userQueries.map((query, index) => (
                            <div class="flex p-4">
                            <p key={index} class="text-[#49719c] text-base flex-grow font-medium leading-normal line-clamp-1">
                                {query}
                            </p>
                            <button 
                                    class="ml-2 text-red-500 hover:text-red-700" 
                                    onClick={() => {
                                        setUserQueries(userQueries.filter((_, i) => i !== index)); // Remove query by index
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p class="text-[#49719c] text-base font-medium leading-normal line-clamp-1">No user queries available.</p>
                    )}
                </div>
                </div>
                <div class="flex px-4 py-3 justify-end">
                <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border border-[#cedbe8] bg-slate-50 focus:border-[#cedbe8] placeholder:text-[#49719c] px-[15px] mx-6 text-base font-normal leading-normal" value={newUserQuery} onChange={(e) => setNewUserQuery(e.target.value)}></input>
                <button 
                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d1e7f4]"
                    onClick={() => {
                        if (newUserQuery.trim()) { // Check if input is not empty
                            setUserQueries([...userQueries, newUserQuery]); // Add input to userQueries
                            setNewUserQuery(''); // Clear the input field
                        }
                    }}
                >
                    <div class="text-[#0d141c]" data-icon="Plus" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                    </svg>
                    </div>
                    <span class="truncate">Add user query</span>
                </button>
                </div>
              </details>

                <div class="flex max-w-[960px] flex-1 flex-col">
                    <div class="flex-1">
                    {(!promptOne || !promptTwo || userQueries.length === 0) && (
                            <p className="flex text-red-500 text-sm justify-center pt-4">Please fill in the prompts and add at least one user query.</p>
                        )}
                    </div>
                    <div class="flex px-4 py-3 justify-center">
                        <button
                            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 ${!promptOne || !promptTwo || userQueries.length === 0 ? 'bg-gray-400' : 'bg-[#0b6fda] hover:bg-blue-700'} text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]`}
                            onClick={handleRunComparison}
                            disabled={!promptOne || !promptTwo || userQueries.length === 0} // Disable button if prompts or user queries are empty
                        >
                            {loading ? (
                                <div class="flex">
                                <span className="truncate flex">Run comparison</span>
                                <span className="loader  flex ml-3"></span>
                                </div>
                            ) : (
                                <span className="truncate">Run comparison</span>
                            )}
                        </button>
                    </div>
                </div>

              {result && Object.keys(result).length > 0 && ( // Check if result is not empty
                <details class="flex flex-col border-t border-t-[#cedbe8] py-2 group" open="">
                  <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
                    <p class="text-[#0d141c] text-[18px] leading-tight tracking-[-0.015em] px-2 pb-3 pt-5">Results Summery</p>
                    <div class="text-[#0d141c] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                  </summary>
                  <div class="flex">
                    <div class="p-4 flex-1 grid grid-cols-[20%_1fr] gap-x-6">
                      <div class="col-span-2 border-t border-t-[#cedbe8] py-5">
                        <p className="text-[#0d141c] text-sm font-normal leading-normal">Result : Prompt one</p>
                      </div>
                      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#cedbe8] py-5">
                        <p class="text-[#49719c] text-sm font-normal leading-normal">Average latency</p>
                        <p className={`text-sm font-normal leading-normal ${result.average_latancy_one < result.average_latancy_two ? 'text-green-500' : 'text-red-500'}`}>
                          {result.average_latancy_one}s
                        </p>
                      </div>
                      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#cedbe8] py-5">
                        <p class="text-[#49719c] text-sm font-normal leading-normal">Average input token count</p>
                        <p className={`text-sm font-normal leading-normal ${result.average_in_token_one < result.average_in_token_two ? 'text-green-500' : 'text-red-500'}`}>
                          {result.average_in_token_one}
                        </p>
                      </div>
                      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#cedbe8] py-5">
                        <p class="text-[#49719c] text-sm font-normal leading-normal">Average output token count</p>
                        <p className={`text-sm font-normal leading-normal ${result.average_out_token_one < result.average_out_token_two ? 'text-green-500' : 'text-red-500'}`}>
                          {result.average_out_token_one}
                        </p>
                      </div>
                    </div>

                    <div class="p-4 flex-1 grid grid-cols-[20%_1fr] gap-x-6">
                      <div class="col-span-2 border-t border-t-[#cedbe8] py-5">
                        <p className="text-[#0d141c] text-sm font-normal leading-normal">Result : Prompt two</p>
                      </div>
                      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#cedbe8] py-5">
                        <p class="text-[#49719c] text-sm font-normal leading-normal">Average latency</p>
                        <p className={`text-sm font-normal leading-normal ${result.average_latancy_two < result.average_latancy_one ? 'text-green-500' : 'text-red-500'}`}>
                          {result.average_latancy_two}s
                        </p>
                      </div>
                      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#cedbe8] py-5">
                        <p class="text-[#49719c] text-sm font-normal leading-normal">Average input token count</p>
                        <p className={`text-sm font-normal leading-normal ${result.average_in_token_two < result.average_in_token_one ? 'text-green-500' : 'text-red-500'}`}>
                          {result.average_in_token_two}
                        </p>
                      </div>
                      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#cedbe8] py-5">
                        <p class="text-[#49719c] text-sm font-normal leading-normal">Average output token count</p>
                        <p className={`text-sm font-normal leading-normal ${result.average_out_token_two < result.average_out_token_one ? 'text-green-500' : 'text-red-500'}`}>
                          {result.average_out_token_two}
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              )}

{result && Object.keys(result).length > 0 && ( // Check if result is not empty
            <details class="flex flex-col border-t border-t-[#cedbe8] py-2 group" open="">
                <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
                <p class="text-[#0d141c] text-[18px] leading-tight tracking-[-0.015em] px-2 pb-3 pt-5">Full Result</p>
                  <div class="text-[#0d141c] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </summary>
                <div class="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2">
                    <div class="flex flex-col justify-center flex-1">
                        <div class="flex p-4" >
                                <div class="flex-1">
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                       Result Promt One
                                    </p>
                                </div>
                                <div class="flex-1">
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                    Result Promt Two
                                    </p>
                                </div>
                            </div>
                    { result.compared_response.map((query, index) => (
                            <div class="flex p-4 border-b border-b-[#cedbe8]" key={index}>
                                <div class="flex-1">
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Query:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_one.query}</span>
                                    </p>
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Latency:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_one.time}</span>
                                    </p>
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Input Token Count:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_one.input_token}</span>
                                    </p>
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Output Token Count:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_one.output_token}</span>
                                    </p>
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Response:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_one.response}</span>
                                    </p>
                                </div>
                                <div class="flex-1">
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Query:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_two.query}</span>
                                    </p>
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Latency:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_two.time}</span>
                                    </p>
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Input Token Count:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_two.input_token}</span>
                                    </p>
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Output Token Count:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_two.output_token}</span>
                                    </p>
                                    <p class="text-[#49719c] text-base flex-grow font-medium leading-normal">
                                        <span class="text-[#0d141c]">Response:</span> 
                                        <span class="text-[#a0aec0]"> {query.result_promt_two.response}</span>
                                    </p>
                                </div>
                                
                            </div>
                    ))}
                </div>
                </div>
            </details>
            )}



            </div>
            </div>
            </div>


          <footer class="flex justify-center">
          
        </footer>


            </div>
        </div>
    );
};

export default App;