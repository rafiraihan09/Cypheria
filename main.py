from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer

# Initialize FastAPI
app = FastAPI()

# Load GPT-2 tokenizer and model
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define topics and subtopics
topics = {
    "Technology": ["AI", "Blockchain", "Gadgets", "Internet", "Software"],
    "Health": ["Fitness", "Nutrition", "Mental Health", "Medicine", "Wellness"],
    "Automobiles": ["Cars", "Motorcycles", "Electric Vehicles", "Maintenance", "Trends"],
    "Sport": ["Football", "Basketball", "Tennis", "Olympics", "Training"],
    "Business": ["Entrepreneurship", "Finance", "Marketing", "Startups", "Economy"],
    "Family": ["Parenting", "Relationships", "Education", "Home", "Work-Life Balance"],
    "Music": ["Genres", "Artists", "Instruments", "Concerts", "Production"],
    "Gaming": ["PC Gaming", "Console Gaming", "Mobile Gaming", "E-Sports", "Game Development"]
}

# Function to validate the prompt
def validate_prompt(topic, subtopic):
    if topic in topics and subtopic in topics[topic]:
        return True
    return False

# Define the function to generate text based on a prompt
def generate_text(topic, subtopic, max_length=200):
    if not validate_prompt(topic, subtopic):
        raise ValueError("Prompt must include a valid topic and subtopic.")
    
    # Create a structured prompt for better relevance
    structured_prompt = f"Let's talk about {topic} and specifically {subtopic}. Here are some insights and information:"
    
    input_ids = tokenizer.encode(structured_prompt, return_tensors="pt")
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

# Define the Pydantic model for input validation
class TextRequest(BaseModel):
    topic: str
    subtopic: str

@app.post("/generate-text")
def generate_text_endpoint(request: TextRequest):
    try:
        text = generate_text(request.topic, request.subtopic)
        return {"generated_text": text}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating text: {str(e)}")

# Run the API with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
