import Link from "next/link";
import React from "react";

import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    tags: [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "JavaScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

interface SearchParamsURLProps {
  searchParams: Promise<{ [key: string]: string }>;
}

// searchParams which is coming from by default URL Params Value

async function Home({ searchParams }: SearchParamsURLProps) {
  console.log("searchParamsURL: ", searchParams);
  const { query = "", filter = "" } = await searchParams;

  // const filterdQuestions = questions.filter((question) =>
  //   question.title.toLowerCase().includes(query.toLowerCase())
  // );

  const filterdQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;

    console.log(
      "matchesQuery && matchesFilter: ",
      matchesQuery && matchesFilter
    );

    return matchesQuery && matchesFilter;
  });

  return (
    <>
      {/* Header Section */}
      <section
        className="flex w-full flex-col-reverse justify-between
       gap-4 sm:flex-row sm:items-center"
      >
        <div className="h1-bold text-dark100_light900">
          Welcome To Home Page
        </div>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="icons/search.svg"
          placeholder="Search questions..."
          otherClasses=""
        />
      </section>
      <section className="mt-11">
        <HomeFilter />{" "}
      </section>
      <section className="mt-10 flex w-full flex-col gap-6">
        {filterdQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </section>
    </>
  );
}

export default Home;
