'use client'

import { use } from 'react'
import { CodeBlock } from '@/components/CodeBlock';
import { questionBank } from '@/app/dummydata/questionBank';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { Question } from '@/app/dummydata/type';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface QuestionPageProps {
  params: Promise<{ question: string }>; // Note: Now a Promise
}

const QuestionPage: React.FC<QuestionPageProps> = ({ params }) => {
  const { question: questionId } = use(params); // ✅ unwrap the Promise

  const question: Question | undefined = questionBank.find(
    (q: Question) => q.id === questionId
  );

  if (!question) {
    return <div>Question not found.</div>;
  }

  const difficultyColor = {
    Easy: "bg-green-500/40",
    Medium: "bg-yellow-500/40",
    Hard: "bg-red-500/40",
  };

  return (
    <div className="space-y-4">
                <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/questions">questions</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{question.title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <h1 className="text-xl font-semibold">{question.title}</h1>
      <p className="text-sm text-muted-foreground">{question.description}</p>

      <Badge
        variant="secondary"
        className={`p-1 rounded-md w-max text-xs ${difficultyColor[question.difficulty]}`}
      >
        {question.difficulty}
      </Badge>

      <CodeBlock code={question.code} />

      <div className="flex flex-wrap gap-2 mt-4">
        {question.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
            #{tag}
          </Badge>
        ))}
      </div>

      <p className="text-sm mt-4 p-3 rounded-md border bg-muted/30 text-muted-foreground">
        {question.howtosolve}
      </p>
    </div>
  );
};

export default QuestionPage;
