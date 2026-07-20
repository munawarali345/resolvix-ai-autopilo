// ================================================================
// SOCKET CLIENT
// ================================================================
//
// Purpose:
// Frontend Socket.IO client.
// Iska kaam sirf connection banana hai.
//
// Responsibilities:
//
// 1. Backend Socket.IO server se connect karna.
// 2. Single shared socket instance provide karna.
// 3. Dashboard, Notifications,
//    Agent Execution,
//    Future realtime modules
//    sab isi socket ko use karenge.
//
// Flow:
//
// Component
//      ↓
// socket.ts
//      ↓
// Socket.IO Client
//      ↓
// Backend Socket.IO Server
//
// ================================================================

'use client';

import { io } from 'socket.io-client';

// ================================================================
// Socket URL
// ================================================================

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_UR!;

// ================================================================
// Shared Socket Instance
// ================================================================

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],

  withCredentials: true,

  autoConnect: false,
});

// transports
// transports:["websocket"]

// Socket.IO normally pehle

// HTTP Polling

// se connect hota hai.

// Phir

// WebSocket

// me upgrade hota hai.

// Tumne bola tha

// Hum websocket hi use krenge.

// Isliye

// transports:["websocket"]

// Ab ye direct websocket use karega.

// No polling.

// withCredentials
// withCredentials:true

// Ye browser ko bolta hai

// Cookies bhejna.

// Agar backend

// refresh token

// session

// jwt cookie

// use kar raha ho

// to browser automatically cookie send karega.
