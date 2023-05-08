import { connectDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to get prompts', { status: 500 });
  }
};

// PATCH

export const PATCH = async (req, { params }) => {
  try {
    await connectDB();
    const { prompt, tag } = await req.json();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response('Prompt not found', { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update prompts', { status: 500 });
  }
};

// DELTE
export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    await connectDB();
    const prompt = await Prompt.findByIdAndDelete(id);
    return new Response('Prompt Successfully Deleted', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 });
  }
};

// DELETE
