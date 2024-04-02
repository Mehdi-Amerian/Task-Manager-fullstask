export interface TaskModel {
    id: string;
    name: string;
    content: string;
    startDate: Date;
    endDate: Date;
    tags: string[];
    status: string;
    activityId: number;
  }