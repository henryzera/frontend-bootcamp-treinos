import dayjs from "dayjs";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { BottomNavClient } from "@/app/_components/bottom-nav-client";

interface BottomNavProps {
  activePage?: "home" | "calendar" | "stats" | "profile";
}

export async function BottomNav({ activePage = "home" }: BottomNavProps) {
  const today = dayjs();
  const homeData = await getHomeData(today.format("YYYY-MM-DD"));

  const calendarHref =
    homeData.status === 200 && homeData.data.activeWorkoutPlanId
      ? `/workout-plans/${homeData.data.activeWorkoutPlanId}`
      : null;

  return <BottomNavClient activePage={activePage} calendarHref={calendarHref} />;
}
