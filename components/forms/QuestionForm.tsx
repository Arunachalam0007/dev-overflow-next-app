"use client";
import { AskQuestionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const formOfReackHook = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: { title: "", content: "", tags: [] },
  });

  const handleCreateQuestion = () => {};

  return (
    <Form {...formOfReackHook}>
      <form
        className="felx flex-col w-full gap-10"
        onSubmit={formOfReackHook.handleSubmit(handleCreateQuestion)}
      >
        {/* Titile */}
        <FormField
          name="title"
          control={formOfReackHook.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300
                   light-border-2 text-dark300_light700 no-focus min-h-[56px]
                    border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you’re asking a question to another
                person
              </FormDescription>
            </FormItem>
          )}
        />
        {/* Editor Content */}
        <FormField
          name="content"
          control={formOfReackHook.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          name="tags"
          control={formOfReackHook.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular background-light700_dark300
                     light-border-2 text-dark300_light700 no-focus min-h-[56px]
                      border"
                    {...field}
                    placeholder="Add tags.."
                  />
                  TAGS TODO
                </div>
              </FormControl>
              <FormDescription>
                Add up to 3 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Ask A Question Button */}
        <div className="flex justify-end mt-16">
          <Button className="primary-gradient !text-light-900 w-fit">
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
