export interface Question {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  code: string
  tags: string[]
  howtosolve: string
}


