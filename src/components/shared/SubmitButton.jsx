"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SubmitButton({ content = "Submit" }) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? `${content}ing...` : content}
    </Button>
  );
}

