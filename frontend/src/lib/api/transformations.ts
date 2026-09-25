import { apiFetch, API_MODE } from './client';
import { Transformation, TransformationCreateRequest, TransformationCreateResponse } from '@/types/transformation';
import { mockTransformations } from './mock/mockData';

export const transformationsApi = {
  create: async (data: TransformationCreateRequest): Promise<TransformationCreateResponse> => {
    if (API_MODE === 'mock') {
      const id = 'trans_' + Date.now();
      return {
        transformation_id: id,
        job_id: id,
        status: 'queued',
      };
    }
    return apiFetch<TransformationCreateResponse>('/transformations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  list: async (projectId?: string): Promise<Transformation[]> => {
    if (API_MODE === 'mock') return mockTransformations;
    const query = projectId ? `?project_id=${projectId}` : '';
    return apiFetch<Transformation[]>(`/transformations${query}`);
  },

  get: async (id: string): Promise<Transformation> => {
    if (API_MODE === 'mock') {
      return mockTransformations.find(t => t.id === id) || mockTransformations[0];
    }
    return apiFetch<Transformation>(`/transformations/${id}`);
  },
};
