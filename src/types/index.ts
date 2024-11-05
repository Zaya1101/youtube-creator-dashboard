export type UserInfo = {
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  error_description?: string;
}

export type Subscriber = {
  snippet: {
    publishedAt: string;
  },
  subscriberSnippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      }
    }
  }
}

export type PieChartData = {
  name: string;
  value: number;
  itemStyle?: {
    color: string;
  }
}

export type LineChartData = string[];