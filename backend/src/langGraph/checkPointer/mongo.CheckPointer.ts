
// ================================================================
// LANGGRAPH MONGODB CHECKPOINTER
// ================================================================
//
// Purpose:
// Persistent LangGraph checkpoint storage.
//
// Used for:
//
// - Human approval interrupt/resume
// - Crash recovery
// - Long-running workflows
//
// ================================================================

import { MongoClient } from "mongodb";

import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";

import { env } from "../../config/validateEnv.js";

// ================================================================
// Mongo Client
// ================================================================

const client = new MongoClient(env.MONGO_URI);

// ================================================================
// Checkpointer
// ================================================================

let checkpointer: MongoDBSaver | null = null;

// ================================================================
// Factory
// ================================================================

export async function createMongoCheckpointer() {

  if (checkpointer) {

    return checkpointer;

  }

  await client.connect();

  checkpointer = new MongoDBSaver({

    client,

  });

  await checkpointer.setup();

  return checkpointer;

}