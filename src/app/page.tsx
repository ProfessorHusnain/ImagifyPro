"use client";
import ActionMenu from "@/components/ActionMenu";
import Compressor from "@/components/Compressor";
import Convert from "@/components/Convert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ActionController, useAction } from "@/hooks/ActionController";

export default function Home() {
  return (
    <ActionController>
      <main className="flex min-h-screen flex-col">
        <Header />
        <ActionMenu />
        <Footer/>
      </main>
    </ActionController>
  );
}
