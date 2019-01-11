export interface UserStats {
  weeklyTotalDuration?: number;
  DailyDurationForLast7Days?: Array<any>;
  todayCompletedTasksCount?: number;
  dailyCompletedTasksForLast7Days?: Array<any>;
  openTasksCount?: number;
  currentWeekWorkedDays?: number;
  last7daysResourceAllocationPerClient?: Array<any>;
}
