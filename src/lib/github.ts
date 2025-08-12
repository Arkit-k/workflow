import { Github } from 'lucide-react';
import { Octokit } from 'octokit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const githubUrl = 'https://github.com/docker/genai-stack';

type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
  const [owner , repo] = githubUrl.split('/').slice(-2);
  // Extract owner and repo from URL
  if (!owner || !repo) {
    throw new Error('Invalid GitHub URL format. Expected format: https://github.com/owner/repo');
  }

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  const sortedCommits = data.sort((a: any, b: any) => 
    new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
  );

  return sortedCommits.slice(0, 15).map((commit: any) => ({
    commitHash: commit.sha,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit?.author?.avatar_url ?? "",
    commitDate: commit.commit?.author.date,
  }));
};

export const pollCommits = async (projectId: string) =>{
  const { githubUrl } = await fetchProjectGithubUrl(projectId);

  if (!githubUrl) {
    throw new Error('No GitHub URL found for this project');
  }

  const commits = await getCommitHashes(githubUrl);
  return commits;
async function fetchProjectGithubUrl(projectId: string) {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select:{
        githubUrl: true,
      }
    });
    return { project, githubUrl: project?.githubUrl };
  }
}

async function summarizeCommits(projectId: string) {

}

export async function filterUnprocessedCommits(projectId: string, commitedHashes: Response[]) {
  const processedCommits = await prisma.commit.findMany({
    where: {
      projectId,
    },
  });
  const unprocessedCommits = commitedHashes.filter((commit) =>
    !processedCommits.find((c) => c.commitHash === commit.commitHash)
  );
  return unprocessedCommits;
}