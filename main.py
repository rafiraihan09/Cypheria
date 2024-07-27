from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer

# Initialize FastAPI
app = FastAPI()

# Load GPT-2 tokenizer and model
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define the function to generate text based on a prompt
def generate_text(prompt, max_length=200):
    try:
        input_ids = tokenizer.encode(prompt, return_tensors="pt")
        output = model.generate(
            input_ids,
            max_length=max_length,
            do_sample=True,
            temperature=0.7,  # Adjust as needed
            top_p=0.9,
            pad_token_id=tokenizer.eos_token_id
        )
        text = tokenizer.decode(output[0], skip_special_tokens=True).strip()
        return text
    except Exception as e:
        return f"Error generating text: {str(e)}"

# Define the Pydantic model for input validation
class TextRequest(BaseModel):
    prompt: str

@app.post("/generate-text")
def generate_text_endpoint(request: TextRequest):
    try:
        text = generate_text(request.prompt)
        return {"generated_text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating text: {str(e)}")

# Run the API with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
