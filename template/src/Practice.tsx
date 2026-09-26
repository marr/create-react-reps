import { Morph, Rise } from "cube-motion/react";
import {
  Activity as ActivityIcon,
  ArrowUpRight,
  Check,
  Flame,
  Palette as PaletteIcon,
  RotateCcw,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import AccentPicker from "@/components/AccentPicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const SESSION_GOAL = 10;
const HISTORY_LIMIT = 5;

function Practice() {
  const [count, setCount] = useState(0);
  const [recentReps, setRecentReps] = useState<number[]>([]);
  const progress = Math.min((count / SESSION_GOAL) * 100, 100);
  const remaining = Math.max(SESSION_GOAL - count, 0);
  const isGoalReached = count >= SESSION_GOAL;
  const isSessionActive = count > 0 && !isGoalReached;

  function addRep() {
    const nextCount = count + 1;
    setCount(nextCount);
    setRecentReps((reps) => [nextCount, ...reps].slice(0, HISTORY_LIMIT));
  }

  function resetSession() {
    setCount(0);
    setRecentReps([]);
  }

  return (
    <Rise as="main" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 sm:py-9">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
          <Link className="flex items-center gap-3 text-foreground no-underline" to="/">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles aria-hidden="true" className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">Practice Room</span>
              <span className="block text-xs text-muted-foreground">
                A little progress, every day
              </span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <AccentPicker />
            <Button render={<Link to="/palette" />} variant="outline" size="lg">
              <PaletteIcon aria-hidden="true" data-icon="inline-start" />
              Palette
            </Button>
            <Button onClick={resetSession} variant="outline" size="lg">
              <RotateCcw aria-hidden="true" data-icon="inline-start" />
              <span className="hidden sm:inline">Reset session</span>
              <span className="sm:hidden">Reset</span>
            </Button>
          </div>
        </header>

        <section className="py-9 sm:py-12" id="practice">
          <div className="mb-7 max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-primary" />
              Your daily practice
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Make room for a little progress.
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Keep it simple. Show up, add a rep, and let the momentum build.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.85fr]">
            <Card
              aria-labelledby="session-title"
              className="data-[active=true]:ring-accent-strong/40 data-[complete=true]:ring-success/40 gap-0 overflow-hidden py-0 shadow-sm transition-shadow duration-300 data-[active=true]:ring-2 data-[complete=true]:ring-2"
              data-active={isSessionActive}
              data-complete={isGoalReached}
              role="region"
            >
              <CardHeader className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-7">
                <CardTitle
                  className="flex items-center gap-2 text-sm font-medium"
                  id="session-title"
                >
                  <Zap aria-hidden="true" className="text-accent-strong size-4" />
                  Focus session
                </CardTitle>
                <span
                  aria-live="polite"
                  className="data-[active=true]:text-accent-strong data-[complete=true]:bg-success/10 data-[complete=true]:text-success inline-flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors data-[active=true]:bg-accent"
                  data-active={isSessionActive}
                  data-complete={isGoalReached}
                  role="status"
                >
                  <span
                    aria-hidden="true"
                    className="bg-flexoki-ui-3 data-[active=true]:bg-accent-strong data-[complete=true]:bg-success size-1.5 rounded-full data-[active=true]:animate-pulse motion-reduce:animate-none"
                    data-active={isSessionActive}
                    data-complete={isGoalReached}
                  />
                  {count > 0 ? (
                    <Morph active={isGoalReached} off="In progress" on="Goal reached" />
                  ) : (
                    "Ready"
                  )}
                </span>
              </CardHeader>

              <CardContent className="px-5 py-7 sm:px-7 sm:py-9">
                <p className="text-sm text-muted-foreground">Reps completed</p>
                <div className="mt-1 flex items-end gap-3" aria-live="polite">
                  <span className="font-mono text-7xl leading-none font-semibold tracking-[-0.07em] tabular-nums sm:text-8xl">
                    {count.toString().padStart(2, "0")}
                  </span>
                  <span className="pb-1.5 text-sm text-muted-foreground">
                    / {SESSION_GOAL} reps
                  </span>
                </div>

                <div className="mt-7">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">Session goal</span>
                    <span className="font-mono text-foreground tabular-nums">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div
                    aria-label="Session goal progress"
                    aria-valuemax={SESSION_GOAL}
                    aria-valuemin={0}
                    aria-valuenow={Math.min(count, SESSION_GOAL)}
                    className="h-2 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                  >
                    <div
                      className="bg-accent-strong data-[complete=true]:bg-success h-full rounded-full transition-[width,background-color] duration-300"
                      data-complete={isGoalReached}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button className="h-11 min-w-36 px-5" onClick={addRep} size="lg">
                    {isGoalReached ? (
                      <Check aria-hidden="true" data-icon="inline-start" />
                    ) : (
                      <Zap aria-hidden="true" data-icon="inline-start" />
                    )}
                    {isGoalReached ? "Keep going" : "Add a rep"}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {isGoalReached
                      ? "You hit today’s goal. Nice work."
                      : `${remaining} ${remaining === 1 ? "rep" : "reps"} to reach your goal`}
                  </p>
                </div>
              </CardContent>
            </Card>

            <aside className="flex flex-col gap-5">
              <Card aria-labelledby="snapshot-title" className="shadow-sm" role="region">
                <CardHeader>
                  <CardTitle id="snapshot-title">Session snapshot</CardTitle>
                  <CardAction>
                    <Target aria-hidden="true" className="size-4 text-muted-foreground" />
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="pr-4">
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">
                        {remaining.toString().padStart(2, "0")}
                      </p>
                    </div>
                    <div className="pl-4">
                      <p className="text-xs text-muted-foreground">Latest rep</p>
                      <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">
                        {count > 0 ? `#${count}` : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-muted p-3.5">
                    <span className="text-accent-strong flex size-8 shrink-0 items-center justify-center rounded-lg bg-card">
                      <Flame aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">
                        {count > 0 ? "Momentum is building" : "Start with one"}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                        {count > 0
                          ? "Every rep counts. Keep your rhythm."
                          : "Small steps make a practice."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card aria-labelledby="activity-title" className="flex-1 shadow-sm" role="region">
                <CardHeader>
                  <CardTitle id="activity-title">Recent activity</CardTitle>
                  <CardDescription>Your latest reps in this session</CardDescription>
                  <CardAction>
                    <ActivityIcon aria-hidden="true" className="size-4 text-muted-foreground" />
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  {recentReps.length > 0 ? (
                    <ol className="mt-5 flex flex-col gap-2">
                      {recentReps.map((rep) => (
                        <li
                          className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
                          key={rep}
                        >
                          <span className="flex items-center gap-2.5 text-sm">
                            <span className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                              <Check aria-hidden="true" className="size-3.5" />
                            </span>
                            Rep completed
                          </span>
                          <span className="font-mono text-xs text-muted-foreground tabular-nums">
                            #{rep.toString().padStart(2, "0")}
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <Empty className="mt-5 min-h-28 border bg-muted/50 px-4">
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <ArrowUpRight aria-hidden="true" />
                        </EmptyMedia>
                        <EmptyTitle>Your first rep is waiting</EmptyTitle>
                        <EmptyDescription>It’ll show up here when you begin.</EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>

        <footer className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="bg-accent-strong size-1.5 rounded-full" /> One rep at a time
          </span>
          <span>Practice Room</span>
        </footer>
      </div>
    </Rise>
  );
}

export default Practice;
