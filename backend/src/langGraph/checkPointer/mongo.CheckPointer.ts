// ================================================================
// LANGGRAPH MONGODB CHECKPOINTER
// ================================================================
//
// Purpose:
// Persistent LangGraph checkpoint storage.
// iska ek kam he -> LangGraph ki state MongoDB me save karna aur baad me wahi se resume karwana.
//
// Used for:
//
// - Human approval interrupt/resume
// - Crash recovery
// - Long-running workflows
//
// ================================================================

import { MongoClient } from 'mongodb';

import { MongoDBSaver } from '@langchain/langgraph-checkpoint-mongodb';

import { env } from '../../config/validateEnv.js';

// ================================================================
// Mongo Client
// ye native MongoClient ha kun ki langgraph mongoose use ni karta
// ================================================================

const client = new MongoClient(env.MONGO_URI);

// ============================================================================
// Checkpointer
// ye singleton he measn server me ek he checkpointer banega har req per ni
// ============================================================================

let checkpointer: MongoDBSaver | null = null;

// ================================================================
// Factory
// ================================================================

export async function createMongoCheckpointer() {
  if (checkpointer) {
    // yaha check kr re he k pehle se bana hua he to yahi se return

    return checkpointer;
  }

  await client.connect(); // yaha Mongo connect hu raha he

  // Yahin actual LangGraph connect hota hai MongoDB se.
  //
  checkpointer = new MongoDBSaver({
    client,
  });

  await checkpointer.setup(); // Ye first time collections banata hai.

  return checkpointer; // yaha Ab Graph compile hoga
}

// graph.compile({
//    checkpointer
// })

// Ab actual flow dekho

// Workflow start

// Detection Service

// ↓

// workflow.invoke()

// State

// Step = orchestrator

// Incident

// Logs

// Detection Result

// etc

// sab memory me hai.

// Root Cause

// ↓

// Fix

// ↓

// Risk

// ↓

// Approval Router

// ↓

// interrupt()

// Yahan

// LangGraph

// automatic

// ye sab Mongo me save kar deta hai

// Thread Id

// Current Node

// Workflow State

// Current Step

// Everything

// Tumne manually save nahi kiya.

// Ye sab

// MongoDBSaver

// kar raha hai.

// Fir admin

// Approve dabata hai

// API chalegi

// workflow.resume(...)

// LangGraph kya karega?

// MongoDB

// ↓

// Thread Id

// ↓

// Load State

// ↓

// approvalRouterNode

// ↓

// interrupt() line

// ↓

// Continue

// Matlab

// ye

// state

// dubara manually build nahi karni.

// Wo already Mongo me stored hai.
