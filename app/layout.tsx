'use client';
import "@/styles/globals.css"
import React from "react";
import {trpc} from "@/app/trpc";
import RootLayout from "@/app/index";

export default trpc.withTRPC(RootLayout);

