export interface UserStats {
  weeklyTotalDuration?: number;
  DailyDurationForLast7Days?: Array<any>;
  todayCompletedTasksCount?: number;
  dailyCompletedTasksForLast7Days?: Array<any>;
  openTasksCount?: number;
  currentWeekWorkedDays?: number;
  currentWeekResourceAllocationPerClient?: Array<any>;
}
