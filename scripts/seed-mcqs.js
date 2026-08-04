import { MongoClient } from 'mongodb';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load .env
const __dirname = dirname(fileURLToPath(import.meta.url));

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "nexus_judgment";

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is missing.");
  process.exit(1);
}

const AI_MCQ_QUESTIONS = [
  // AI Fundamentals & Search
  {
    category: "Artificial Intelligence",
    text: "Which of the following best describes the Turing Test?",
    options: [
      "A test to measure a computer's processing speed.",
      "A test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human.",
      "An algorithm for finding the shortest path in a graph.",
      "A method for evaluating the security of a neural network."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Artificial Intelligence",
    text: "What is an 'agent' in the context of Artificial Intelligence?",
    options: [
      "A piece of code that acts on behalf of a user to perform specific tasks autonomously.",
      "A human operator monitoring the AI.",
      "The environment in which the AI operates.",
      "A specific type of neural network layer."
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "Artificial Intelligence",
    text: "In state-space search, what does the A* algorithm use to find the optimal path?",
    options: [
      "Only the exact cost from the start node.",
      "Only a heuristic estimate to the goal.",
      "Both the exact cost from the start node and a heuristic estimate to the goal.",
      "Random sampling of possible paths."
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "Artificial Intelligence",
    text: "What is the primary difference between Strong AI and Weak (Narrow) AI?",
    options: [
      "Strong AI requires more computing power than Weak AI.",
      "Strong AI possesses general human-level intelligence, while Weak AI is designed for a specific task.",
      "Strong AI is open-source, whereas Weak AI is proprietary.",
      "Strong AI uses neural networks, while Weak AI relies on decision trees."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Knowledge Representation",
    text: "In knowledge representation, what is an ontology?",
    options: [
      "A formalized vocabulary of terms and relationships representing a specific domain.",
      "A machine learning model used for text classification.",
      "A type of graph database.",
      "An algorithm for natural language parsing."
    ],
    correctAnswer: 0,
    active: true
  },
  // Machine Learning
  {
    category: "Machine Learning",
    text: "Which of the following is a classic example of Unsupervised Learning?",
    options: [
      "Predicting house prices using historical sales data.",
      "Classifying emails as spam or not spam.",
      "Clustering customers into distinct segments based on purchasing behavior.",
      "Teaching a robotic arm to grasp objects via trial and error."
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "Machine Learning",
    text: "What does it mean when a machine learning model is 'overfitting'?",
    options: [
      "It performs well on the training data but poorly on unseen test data.",
      "It performs poorly on both training and test data.",
      "It requires too much memory to run.",
      "It trains too quickly, ignoring complex patterns."
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "Machine Learning",
    text: "Which technique is commonly used to prevent overfitting in decision trees?",
    options: [
      "Backpropagation",
      "Pruning",
      "Gradient Descent",
      "Tokenization"
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Machine Learning",
    text: "In the context of machine learning, what is Cross-Validation used for?",
    options: [
      "To increase the size of the dataset synthetically.",
      "To evaluate a model's ability to generalize to independent data.",
      "To encrypt training data for privacy.",
      "To transform categorical variables into numerical ones."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Machine Learning",
    text: "What is the primary goal of a Regression algorithm?",
    options: [
      "To group similar data points together.",
      "To predict a continuous numerical value.",
      "To classify data into discrete categories.",
      "To find the shortest path in a network."
    ],
    correctAnswer: 1,
    active: true
  },
  // Deep Learning
  {
    category: "Deep Learning",
    text: "What is the role of an Activation Function in a neural network?",
    options: [
      "To calculate the final loss of the network.",
      "To update the weights during backpropagation.",
      "To introduce non-linearity into the network's output.",
      "To load data batches into memory."
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "Deep Learning",
    text: "Which algorithm is primarily used to update weights in a neural network to minimize the loss?",
    options: [
      "K-Means Clustering",
      "Principal Component Analysis",
      "Gradient Descent via Backpropagation",
      "Support Vector Machines"
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "Deep Learning",
    text: "Convolutional Neural Networks (CNNs) are primarily designed for which type of data?",
    options: [
      "Time-series financial data",
      "Grid-like data such as images",
      "Relational database tables",
      "Unstructured text documents"
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Deep Learning",
    text: "What problem do Long Short-Term Memory (LSTM) networks solve in standard RNNs?",
    options: [
      "The vanishing gradient problem for long sequences.",
      "The inability to process images.",
      "High computational cost of fully connected layers.",
      "Overfitting on small datasets."
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "Deep Learning",
    text: "What does the 'learning rate' hyperparameter control in a neural network?",
    options: [
      "The number of layers in the network.",
      "The size of the steps taken during gradient descent.",
      "The batch size of the training data.",
      "The probability of dropping a neuron in Dropout."
    ],
    correctAnswer: 1,
    active: true
  },
  // Generative AI & LLMs
  {
    category: "Generative AI",
    text: "Which architecture forms the foundation of modern Large Language Models (LLMs) like GPT-4?",
    options: [
      "Recurrent Neural Networks (RNN)",
      "Generative Adversarial Networks (GAN)",
      "Transformer",
      "Convolutional Neural Networks (CNN)"
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "Generative AI",
    text: "In the context of LLMs, what is a 'token'?",
    options: [
      "A secure cryptographic key used for API access.",
      "A sub-word piece of text that the model processes as a single unit.",
      "A full sentence fed into the model.",
      "The final prediction output by the model."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Generative AI",
    text: "What does the 'Temperature' parameter control during text generation?",
    options: [
      "The maximum length of the output.",
      "The randomness and creativity of the generated text.",
      "The speed at which the model generates text.",
      "The amount of memory allocated to the generation process."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Generative AI",
    text: "What is an 'embedding' in Natural Language Processing?",
    options: [
      "A dense vector representation of text capturing semantic meaning.",
      "A physical hardware chip optimized for AI.",
      "A technique for hiding text inside an image.",
      "A rule-based dictionary of words."
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "Generative AI",
    text: "Which of the following best defines AI 'Hallucination'?",
    options: [
      "When an AI system generates a highly accurate but controversial response.",
      "When an AI system confidently generates false, nonsensical, or unverified information.",
      "When an AI system refuses to answer a prompt.",
      "When an AI system processes visual inputs incorrectly."
    ],
    correctAnswer: 1,
    active: true
  },
  // RAG & Vector Databases
  {
    category: "RAG Systems",
    text: "What does RAG stand for in the context of LLMs?",
    options: [
      "Random Augmented Generation",
      "Retrieval-Augmented Generation",
      "Real-time Artificial Generation",
      "Recurrent Algorithm Grouping"
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "RAG Systems",
    text: "What is the primary purpose of using RAG with an LLM?",
    options: [
      "To increase the model's training speed.",
      "To allow the model to fetch external, up-to-date knowledge before answering.",
      "To reduce the number of parameters in the model.",
      "To generate images from text descriptions."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "RAG Systems",
    text: "Which type of database is most commonly used to store and search embeddings in a RAG pipeline?",
    options: [
      "Relational Database (e.g., PostgreSQL)",
      "Document Database (e.g., MongoDB)",
      "Vector Database (e.g., Pinecone, Milvus)",
      "Time-Series Database (e.g., InfluxDB)"
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "RAG Systems",
    text: "How does a vector database determine the relevance of stored documents to a user query?",
    options: [
      "By looking for exact keyword matches.",
      "By calculating the mathematical distance (e.g., cosine similarity) between vectors.",
      "By executing complex SQL JOIN operations.",
      "By asking an LLM to read all documents."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "RAG Systems",
    text: "Which chunking strategy is generally most effective when preparing long documents for a vector database?",
    options: [
      "Storing the entire document as a single vector.",
      "Splitting the text into individual characters.",
      "Splitting the text into overlapping semantic chunks (e.g., paragraphs).",
      "Removing all vowels before embedding."
    ],
    correctAnswer: 2,
    active: true
  },
  // AI Agents & Tool Calling
  {
    category: "AI Agents",
    text: "What distinguishes an 'Agentic Workflow' from a standard LLM chat completion?",
    options: [
      "Agentic workflows only run on local hardware.",
      "Agents can autonomously plan, use external tools, and iterate to achieve a goal.",
      "Agentic workflows are completely deterministic.",
      "Agents do not use neural networks."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "AI Agents",
    text: "In the ReAct (Reasoning and Acting) framework, what does the model do?",
    options: [
      "It interleaves thinking about the problem with taking actions in an environment.",
      "It acts immediately without reasoning.",
      "It only reasons and outputs a plan for a human to execute.",
      "It translates code from React.js to AI models."
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "AI Agents",
    text: "What is 'Tool Calling' or 'Function Calling' in modern LLMs?",
    options: [
      "The ability of the model to execute raw Python code inside its weights.",
      "The ability of the model to output structured data (e.g., JSON) indicating which external function to invoke.",
      "The process of fine-tuning the model on function definitions.",
      "A debugging tool for AI researchers."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "AI Agents",
    text: "Which of the following is a critical component of an AI agent's memory?",
    options: [
      "The model's pre-trained weights.",
      "A context window or database maintaining the history of the conversation and actions.",
      "The GPU VRAM allocation.",
      "The learning rate schedule."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "AI Agents",
    text: "What is a common failure mode for autonomous AI agents?",
    options: [
      "Achieving sentience and refusing commands.",
      "Getting stuck in infinite loops of identical actions or repeating identical tool calls.",
      "Running out of pre-trained weights.",
      "Converting all data to binary."
    ],
    correctAnswer: 1,
    active: true
  },
  // NLP (Natural Language Processing)
  {
    category: "NLP",
    text: "What is the purpose of the 'Attention Mechanism' in NLP models?",
    options: [
      "To ensure the user is paying attention to the output.",
      "To allow the model to weigh the importance of different words in a sequence when processing a specific word.",
      "To filter out stop words like 'the' and 'a'.",
      "To translate text into audio."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "NLP",
    text: "Which concept allows the Transformer architecture to process words in parallel rather than sequentially?",
    options: [
      "Recurrent loops",
      "Self-attention and positional encoding",
      "Markov chains",
      "Gradient clipping"
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "NLP",
    text: "What is the primary role of Positional Encodings in a Transformer model?",
    options: [
      "To determine the sentiment of the sentence.",
      "To inject information about the relative or absolute position of the tokens in the sequence.",
      "To compress the input data.",
      "To map words to their grammatical parts of speech."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "NLP",
    text: "Which of the following tasks is an example of Named Entity Recognition (NER)?",
    options: [
      "Translating a sentence from English to French.",
      "Identifying 'Apple' as a company and 'New York' as a location in a text.",
      "Summarizing a long document.",
      "Generating a poem about a specific topic."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "NLP",
    text: "In NLP, what is 'perplexity' commonly used for?",
    options: [
      "Measuring how confused a user is by the model's output.",
      "Evaluating the performance of language models; a lower perplexity indicates better prediction.",
      "Determining the difficulty level of a text.",
      "Calculating the cosine similarity between two vectors."
    ],
    correctAnswer: 1,
    active: true
  },
  // Computer Vision
  {
    category: "Computer Vision",
    text: "In a Convolutional Neural Network (CNN), what is the purpose of a Pooling layer (e.g., MaxPooling)?",
    options: [
      "To increase the spatial dimensions of the input.",
      "To add color information to grayscale images.",
      "To reduce the spatial dimensions, decreasing the number of parameters and computation.",
      "To output the final class probabilities."
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "Computer Vision",
    text: "Which task involves not only identifying objects in an image but also drawing bounding boxes around them?",
    options: [
      "Image Classification",
      "Object Detection",
      "Semantic Segmentation",
      "Style Transfer"
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Computer Vision",
    text: "What is Semantic Segmentation in computer vision?",
    options: [
      "Classifying the entire image into one category.",
      "Assigning a class label to every individual pixel in the image.",
      "Detecting the emotional state of a person in a photo.",
      "Converting an image into a 3D model."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Computer Vision",
    text: "Which modern architecture has been successfully adapted from NLP to Computer Vision tasks, challenging CNNs?",
    options: [
      "Vision Transformers (ViT)",
      "Recurrent Neural Networks (RNN)",
      "Support Vector Machines (SVM)",
      "Generative Adversarial Networks (GAN)"
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "Computer Vision",
    text: "What are Generative Adversarial Networks (GANs) typically used for?",
    options: [
      "Sorting tabular data.",
      "Generating highly realistic synthetic images and media.",
      "Translating languages.",
      "Transcribing audio to text."
    ],
    correctAnswer: 1,
    active: true
  },
  // AI Ethics & Security
  {
    category: "AI Ethics",
    text: "What is Algorithmic Bias in AI?",
    options: [
      "When an algorithm runs faster on one type of hardware than another.",
      "Systematic and repeatable errors in a computer system that create unfair outcomes, such as privileging one arbitrary group over others.",
      "The tendency of an AI to prefer deep learning over traditional machine learning.",
      "A mathematical constant added to neural networks."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Cyber Security",
    text: "What is a 'Prompt Injection' attack?",
    options: [
      "Injecting malicious SQL code into a traditional database.",
      "Crafting adversarial inputs to manipulate an LLM into overriding its safety instructions and performing unauthorized actions.",
      "Physically modifying the GPU hardware running the AI.",
      "Sending too many requests to an API to cause a denial of service."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "AI Ethics",
    text: "Which of the following best describes 'Data Leakage' in machine learning?",
    options: [
      "When training data is accidentally exposed to the public.",
      "When information from outside the training dataset is used to create the model, leading to overly optimistic performance estimates.",
      "When a neural network loses weights during backpropagation.",
      "When an API endpoint returns too much JSON data."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "AI Ethics",
    text: "In the context of generative AI, why is 'Copyright Infringement' a major concern?",
    options: [
      "AI models might generate executable malware.",
      "AI models are often trained on massive amounts of copyrighted material without explicit permission or compensation.",
      "AI models consume too much electricity.",
      "AI models cannot be patented."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Cyber Security",
    text: "What is an adversarial attack in the context of computer vision?",
    options: [
      "Using a virus to delete the model's weights.",
      "Applying carefully crafted, often imperceptible noise to an image to intentionally fool the AI into misclassifying it.",
      "Training a second model to compete with the first model.",
      "Stealing the training dataset from the server."
    ],
    correctAnswer: 1,
    active: true
  },
  // Advanced Machine Learning
  {
    category: "Machine Learning",
    text: "What is 'Transfer Learning'?",
    options: [
      "Transferring data from a local hard drive to a cloud server.",
      "Using knowledge gained while solving one problem and applying it to a different but related problem.",
      "The process of translating one programming language to another using AI.",
      "Moving a model from PyTorch to TensorFlow."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Machine Learning",
    text: "What does RLHF stand for in modern AI model training?",
    options: [
      "Recurrent Learning with Hidden Features",
      "Reinforcement Learning from Human Feedback",
      "Randomized Logic for Heuristic Functions",
      "Real-time Language Handling Framework"
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Machine Learning",
    text: "In Reinforcement Learning, what defines the goal of the agent?",
    options: [
      "The Loss Function",
      "The Reward Signal",
      "The Learning Rate",
      "The Training Data"
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Deep Learning",
    text: "Which regularization technique randomly drops units (along with their connections) from the neural network during training?",
    options: [
      "L2 Regularization",
      "Early Stopping",
      "Dropout",
      "Data Augmentation"
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "Deep Learning",
    text: "What is a 'Zero-Shot' capability in LLMs?",
    options: [
      "The ability of a model to perform a task it was not explicitly fine-tuned on, using only a prompt without any examples.",
      "A model that requires zero training time.",
      "A model that consumes zero memory during inference.",
      "The ability to detect malware without signatures."
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "Generative AI",
    text: "What is 'Few-Shot' prompting?",
    options: [
      "Providing the model with a few gigabytes of data.",
      "Providing the model with a small number of examples in the prompt to demonstrate the desired output format or task.",
      "Running the model on a few GPUs simultaneously.",
      "Generating only a few words of text before stopping."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "AI Ethics",
    text: "Which of the following is a technique used to improve the fairness of an AI model?",
    options: [
      "Removing all data related to minority groups.",
      "Auditing datasets for historical biases and adjusting class weights or sampling techniques.",
      "Increasing the complexity of the neural network.",
      "Encrypting the model weights."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "AI Ethics",
    text: "What does 'Explainable AI' (XAI) aim to achieve?",
    options: [
      "To make AI models run faster.",
      "To create AI models that can generate human-like explanations for their decisions and inner workings.",
      "To write documentation for AI software automatically.",
      "To train models that understand multiple languages."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Generative AI",
    text: "In the context of LLMs, what is the 'Context Window'?",
    options: [
      "The user interface where text is entered.",
      "The maximum amount of text (measured in tokens) the model can consider at one time when generating a response.",
      "The time frame during which the model was trained.",
      "The operating system environment running the model."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Generative AI",
    text: "What is the primary function of a 'System Prompt' in an LLM conversation?",
    options: [
      "To ping the server to keep the connection alive.",
      "To provide high-level instructions, persona definitions, or constraints that guide the model's behavior throughout the interaction.",
      "To format the output as HTML.",
      "To bypass the model's safety filters."
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Deep Learning",
    text: "What does the 'Softmax' function typically do in a neural network classification model?",
    options: [
      "Converts raw output scores (logits) into a probability distribution over multiple classes.",
      "Reduces the size of an image.",
      "Initializes the weights before training.",
      "Calculates the exact error margin."
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "Deep Learning",
    text: "Which metric is commonly used to evaluate the performance of an object detection model?",
    options: [
      "Mean Squared Error (MSE)",
      "Mean Average Precision (mAP)",
      "Perplexity",
      "Cosine Similarity"
    ],
    correctAnswer: 1,
    active: true
  },
  {
    category: "Machine Learning",
    text: "What is the primary characteristic of an 'Ensemble' method in machine learning?",
    options: [
      "It combines predictions from multiple individual models to improve overall performance and robustness.",
      "It uses a single, extremely large neural network.",
      "It relies exclusively on unsupervised data.",
      "It executes entirely on the client side."
    ],
    correctAnswer: 0,
    active: true
  },
  {
    category: "Machine Learning",
    text: "Random Forest is an example of which type of ensemble method?",
    options: [
      "Boosting",
      "Stacking",
      "Bagging (Bootstrap Aggregating)",
      "Clustering"
    ],
    correctAnswer: 2,
    active: true
  },
  {
    category: "Artificial Intelligence",
    text: "Which classical AI search algorithm is guaranteed to find the shortest path if step costs are non-negative?",
    options: [
      "Depth-First Search (DFS)",
      "Dijkstra's Algorithm",
      "Random Walk",
      "Hill Climbing"
    ],
    correctAnswer: 1,
    active: true
  }
];

async function seed() {
  console.log("Starting MCQ Database Seed Process...");
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully.");
    
    const db = client.db(MONGODB_DB_NAME);
    const mcqColl = db.collection("mcqQuestions");
    
    // Check existing questions
    const existingCount = await mcqColl.countDocuments();
    console.log(`Existing MCQ questions in database: ${existingCount}`);
    
    const existingQuestions = await mcqColl.find({}).toArray();
    const existingTexts = new Set(existingQuestions.map(q => q.text));
    
    let insertedCount = 0;
    let duplicatesSkipped = 0;
    
    const toInsert = [];
    
    for (const q of AI_MCQ_QUESTIONS) {
      if (!existingTexts.has(q.text)) {
        toInsert.push({
          id: randomUUID(),
          category: q.category,
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
          active: q.active
        });
      } else {
        duplicatesSkipped++;
      }
    }
    
    if (toInsert.length > 0) {
      await mcqColl.insertMany(toInsert);
      insertedCount = toInsert.length;
      console.log(`Inserted ${insertedCount} new AI MCQ questions.`);
    } else {
      console.log("No new questions to insert. All generated questions already exist.");
    }
    
    const finalCount = await mcqColl.countDocuments({ active: true });
    
    console.log("\nMCQ SEED COMPLETE");
    console.log(`Existing questions preserved: YES (${existingCount})`);
    console.log(`New questions generated: ${AI_MCQ_QUESTIONS.length}`);
    console.log(`New questions inserted: ${insertedCount}`);
    console.log(`Duplicates skipped: ${duplicatesSkipped}`);
    console.log(`Total Active MCQs available: ${finalCount}`);
    
  } catch (error) {
    console.error("Error during MCQ seed process:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

seed();
