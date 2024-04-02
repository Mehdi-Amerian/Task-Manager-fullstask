export type Task = {
    id: number;
    name: string;
    content: string;
    startDate: Date;
    endDate: Date;
    tags: string[];
    status: string;
    activityId: number;
  };

  export interface Activity {
    id: number;
    name: string;
    description: string;
    url: string;
    startDate: string;
    endDate: string;
    status: string;
    tags: string;
    activityType: string;
  }
  