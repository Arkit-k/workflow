import React from 'react';
import { api } from '../trpc/react';
import { useLocalStorage } from 'usehooks-ts';
import { Workflow } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  // Add other project properties as needed
}

const useProject = () => {
  const { data: projects = [], isLoading, error } = api.project.getProjects.useQuery();
  const [projectId, setProjectId] = useLocalStorage<string | null>('workflow-projectId', null);

  // Safely find the project
  const project = React.useMemo(() => {
    if (!projects || !projectId) return undefined;
    return projects.find((project) => project.id === projectId);
  }, [projects, projectId]);

  // Set first project as default if none selected
  React.useEffect(() => {
    if (projects?.length > 0 && !projectId) {
      setProjectId(projects[0].id);
    }
  }, [projects, projectId, setProjectId]);

  return {
    projects: projects as Project[], // Ensures array type
    project,
    projectId,
    setProjectId,
    isLoading,
    error
  };
};

export default useProject;