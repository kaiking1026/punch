const STORAGE_KEY = "pwa-checkin-planner-v3";
const LEGACY_KEYS = ["pwa-checkin-planner-v2", "pwa-checkin-planner-v1"];
const DATE_FORMATTER = new Intl.DateTimeFormat("zh-CN", {
  month: "long",
  day: "numeric",
  weekday: "short",
});
const DATETIME_FORMATTER = new Intl.DateTimeFormat("zh-CN", {
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const MONTH_FORMATTER = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
});
const TEXT = {
  installFileMode: "\u5f53\u524d\u662f\u672c\u5730\u6587\u4ef6\u6a21\u5f0f\uff0c\u90e8\u7f72\u540e\u624d\u53ef\u5b89\u88c5\u5230\u684c\u9762",
  installIos: "iPhone \u4e0a\u53ef\u7528 Safari \u52a0\u5230\u4e3b\u5c4f\u5e55",
  installAndroid: "Android \u4e0a\u53ef\u6dfb\u52a0\u5230\u684c\u9762\u4f7f\u7528",
  installGeneric: "\u901a\u8fc7 HTTPS \u6216 localhost \u6253\u5f00\u65f6\u53ef\u5b89\u88c5",
  defaultHabitName: "\u672a\u547d\u540d\u9879\u76ee",
  defaultHabitTarget: "\u6ca1\u6709\u586b\u5199\u9879\u76ee\u8bf4\u660e\u3002",
  noHabitYet: "\u8fd8\u6ca1\u6709\u6253\u5361\u9879\u76ee\uff0c\u70b9\u53f3\u4e0a\u89d2\u7684 + \u65b0\u5efa\u4e00\u4e2a\u5427\u3002",
  noDayEntries: "\u8fd9\u4e00\u5929\u8fd8\u6ca1\u6709\u8bb0\u5f55\u3002",
  tapDatePrompt: "\u70b9\u4e00\u4e2a\u65e5\u671f\uff0c\u5c31\u53ef\u8865\u6253\u5361\u6216\u65b0\u5efa\u65e5\u7a0b\u3002",
  addHabitFirst: "\u8bf7\u5148\u65b0\u5efa\u4e00\u4e2a\u6253\u5361\u9879\u76ee\u3002",
  addedHabit: "\u6253\u5361\u9879\u76ee\u5df2\u521b\u5efa",
  checkedIn: "\u6253\u5361\u5df2\u8bb0\u4e0a",
  addedSchedule: "\u65e5\u7a0b\u5df2\u52a0\u5165",
  importSuccess: "\u6570\u636e\u5bfc\u5165\u6210\u529f\u3002",
  importFailed: "\u5bfc\u5165\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4\u6587\u4ef6\u683c\u5f0f\u6b63\u786e\u3002",
  deleteHabitConfirmStart: "\u786e\u8ba4\u5220\u9664\u201c",
  deleteHabitConfirmEnd: "\u201d\u5417\uff1f\u76f8\u5173\u6253\u5361\u8bb0\u5f55\u4e5f\u4f1a\u4e00\u8d77\u5220\u9664\u3002",
  deleteCheckinConfirm: "\u786e\u8ba4\u5220\u9664\u8fd9\u6761\u6253\u5361\u8bb0\u5f55\u5417\uff1f",
  deleteScheduleConfirm: "\u786e\u8ba4\u5220\u9664\u8fd9\u6761\u65e5\u7a0b\u5417\uff1f",
  totalCheckedStart: "\u7d2f\u8ba1\u6253\u5361 ",
  timesUnit: "\u6b21",
  recordsUnit: "\u6761\u8bb0\u5f55",
  scheduleType: "\u65e5\u7a0b",
  checkinType: "\u6253\u5361",
  noNote: "\u6ca1\u6709\u8865\u5145\u5185\u5bb9\u3002",
  restoreTodo: "\u6062\u590d\u5f85\u529e",
  markDone: "\u6807\u8bb0\u5b8c\u6210",
  delete: "\u5220\u9664",
  scheduleDone: "\u5df2\u5b8c\u6210",
  scheduleTodo: "\u5f85\u529e",
  lastCheckedStart: "\u4e0a\u6b21\u6253\u5361 ",
  neverChecked: "\u8fd8\u6ca1\u6709\u6253\u5361\u8bb0\u5f55",
  migratedHabitName: "\u65e7\u7248\u6bcf\u65e5\u6253\u5361",
  migratedHabitTarget: "\u4ece\u65e7\u7248\u672c\u81ea\u52a8\u8fc1\u79fb\u800c\u6765",
};
const HABIT_COLORS = [
  { id: "coral", label: "\u73ca\u745a", value: "#ef8f7b", soft: "#f9ded6" },
  { id: "apricot", label: "\u674f\u6843", value: "#f3b370", soft: "#fce9cf" },
  { id: "olive", label: "\u6a44\u6984", value: "#9db66d", soft: "#e7efd6" },
  { id: "sky", label: "\u6674\u7a7a", value: "#6da6d9", soft: "#dce9f7" },
  { id: "plum", label: "\u6885\u5b50", value: "#a287d8", soft: "#ebe4f8" },
];
const HABIT_SHAPES = [
  { id: "circle", label: "\u5706\u5f62" },
  { id: "rounded", label: "\u80f6\u56ca" },
  { id: "diamond", label: "\u83f1\u5f62" },
  { id: "triangle", label: "\u4e09\u89d2" },
  { id: "star", label: "\u661f\u5f62" },
];

const el = {
  pages: document.querySelector("#pages"),
  pageSwitcher: document.querySelector("#pageSwitcher"),
  todayLabel: document.querySelector("#todayLabel"),
  installHint: document.querySelector("#installHint"),
  weekCheckinCount: document.querySelector("#weekCheckinCount"),
  habitCount: document.querySelector("#habitCount"),
  todoCount: document.querySelector("#todoCount"),
  habitGrid: document.querySelector("#habitGrid"),
  openHabitModalButton: document.querySelector("#openHabitModalButton"),
  habitModal: document.querySelector("#habitModal"),
  habitForm: document.querySelector("#habitForm"),
  habitNameInput: document.querySelector("#habitNameInput"),
  habitTargetInput: document.querySelector("#habitTargetInput"),
  colorSelector: document.querySelector("#colorSelector"),
  shapeSelector: document.querySelector("#shapeSelector"),
  jumpTodayButton: document.querySelector("#jumpTodayButton"),
  prevMonthButton: document.querySelector("#prevMonthButton"),
  nextMonthButton: document.querySelector("#nextMonthButton"),
  calendarMonthLabel: document.querySelector("#calendarMonthLabel"),
  calendarGrid: document.querySelector("#calendarGrid"),
  daySheet: document.querySelector("#daySheet"),
  selectedDateLabel: document.querySelector("#selectedDateLabel"),
  selectedDateSummary: document.querySelector("#selectedDateSummary"),
  dayCheckinNoteInput: document.querySelector("#dayCheckinNoteInput"),
  dayHabitButtons: document.querySelector("#dayHabitButtons"),
  dayScheduleForm: document.querySelector("#dayScheduleForm"),
  dayScheduleTitleInput: document.querySelector("#dayScheduleTitleInput"),
  dayScheduleTimeInput: document.querySelector("#dayScheduleTimeInput"),
  dayScheduleNoteInput: document.querySelector("#dayScheduleNoteInput"),
  selectedDateList: document.querySelector("#selectedDateList"),
  exportButton: document.querySelector("#exportButton"),
  importButton: document.querySelector("#importButton"),
  importFileInput: document.querySelector("#importFileInput"),
  toast: document.querySelector("#toast"),
  habitCardTemplate: document.querySelector("#habitCardTemplate"),
  detailItemTemplate: document.querySelector("#detailItemTemplate"),
};

let state = loadState();
let calendarCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let selectedDateKey = "";
let selectedColorId = HABIT_COLORS[0].id;
let selectedShapeId = HABIT_SHAPES[0].id;
let toastTimer = 0;

boot();

function boot() {
  el.todayLabel.textContent = DATE_FORMATTER.format(new Date());
  el.installHint.textContent = getInstallHint();
  renderSelectors();
  bindEvents();
  render();
  registerServiceWorker();
}

function bindEvents() {
  el.pageSwitcher.querySelectorAll("[data-page-index]").forEach((button) => {
    button.addEventListener("click", () => {
      switchToPage(Number(button.dataset.pageIndex));
    });
  });

  el.pages.addEventListener("scroll", syncPageSwitcher);
  el.openHabitModalButton.addEventListener("click", openHabitModal);
  el.jumpTodayButton.addEventListener("click", () => {
    const now = new Date();
    calendarCursor = new Date(now.getFullYear(), now.getMonth(), 1);
    selectedDateKey = getDateKey(now);
    renderCalendar();
    switchToPage(1);
    openDaySheet(selectedDateKey);
  });

  el.prevMonthButton.addEventListener("click", () => {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
    renderCalendar();
  });

  el.nextMonthButton.addEventListener("click", () => {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
    renderCalendar();
  });

  el.habitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createHabit();
  });

  el.dayScheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createScheduleForSelectedDate();
  });

  document.querySelectorAll("[data-close-habit-modal]").forEach((item) => {
    item.addEventListener("click", closeHabitModal);
  });

  document.querySelectorAll("[data-close-day-sheet]").forEach((item) => {
    item.addEventListener("click", closeDaySheet);
  });

  el.exportButton.addEventListener("click", exportState);
  el.importButton.addEventListener("click", () => el.importFileInput.click());
  el.importFileInput.addEventListener("change", importState);
}

function render() {
  renderStats();
  renderHabitGrid();
  renderCalendar();
  syncPageSwitcher();
  if (selectedDateKey && !el.daySheet.hidden) {
    renderDaySheet();
  }
}

function renderStats() {
  el.habitCount.textContent = String(getActiveHabits().length);
  el.weekCheckinCount.textContent = String(countCheckinsWithinDays(7));
  el.todoCount.textContent = String(state.schedules.filter((item) => !item.done).length);
}

function renderHabitGrid() {
  const habits = getActiveHabits();
  el.habitGrid.innerHTML = "";

  if (!habits.length) {
    appendEmptyMessage(el.habitGrid, TEXT.noHabitYet);
    return;
  }

  habits.forEach((habit) => {
    const fragment = el.habitCardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".habit-card");
    const marker = fragment.querySelector(".habit-marker");
    const last = fragment.querySelector(".habit-last");
    const title = fragment.querySelector(".habit-title");
    const target = fragment.querySelector(".habit-target");
    const total = fragment.querySelector(".habit-total");

    applyHabitMarkerStyle(marker, habit, "large");
    last.textContent = habit.lastCheckedAt ? TEXT.lastCheckedStart + formatDateTime(habit.lastCheckedAt) : TEXT.neverChecked;
    title.textContent = habit.name;
    target.textContent = habit.target || TEXT.defaultHabitTarget;
    total.textContent = TEXT.totalCheckedStart + countHabitCheckins(habit.id) + " " + TEXT.timesUnit;

    card.addEventListener("click", () => {
      recordCheckin(habit.id, "", getDateKey(new Date()));
      showToast(TEXT.checkedIn);
    });

    card.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (window.confirm(TEXT.deleteHabitConfirmStart + habit.name + TEXT.deleteHabitConfirmEnd)) {
        deleteHabit(habit.id);
      }
    });

    el.habitGrid.appendChild(fragment);
  });
}

function renderCalendar() {
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const leadingBlanks = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  el.calendarMonthLabel.textContent = MONTH_FORMATTER.format(firstDay);
  el.calendarGrid.innerHTML = "";

  for (let index = 0; index < leadingBlanks; index += 1) {
    el.calendarGrid.appendChild(createBlankCalendarCell());
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, month, day);
    const dateKey = getDateKey(date);
    const summary = getDateSummary(dateKey);
    const button = document.createElement("button");
    const top = document.createElement("div");
    const dayNumber = document.createElement("span");
    const markerColumn = document.createElement("div");
    const scheduleColumn = document.createElement("div");

    button.type = "button";
    button.className = "calendar-cell";
    if (dateKey === getDateKey(new Date())) {
      button.classList.add("is-today");
    }
    if (dateKey === selectedDateKey) {
      button.classList.add("is-selected");
    }

    top.className = "calendar-cell-top";
    dayNumber.className = "calendar-day-number";
    dayNumber.textContent = String(day);

    markerColumn.className = "calendar-marker-column";
    summary.markers.forEach((habit) => {
      const marker = document.createElement("span");
      applyHabitMarkerStyle(marker, habit, "mini");
      marker.classList.add("calendar-side-marker");
      marker.title = habit.name;
      markerColumn.appendChild(marker);
    });

    scheduleColumn.className = "calendar-schedule-column";
    summary.schedules.slice(0, 2).forEach((schedule) => {
      const item = document.createElement("span");
      item.className = `calendar-schedule-item${schedule.done ? " is-done" : ""}`;
      item.textContent = schedule.title;
      scheduleColumn.appendChild(item);
    });
    if (summary.schedules.length > 2) {
      const more = document.createElement("span");
      more.className = "calendar-schedule-more";
      more.textContent = `+${summary.schedules.length - 2}`;
      scheduleColumn.appendChild(more);
    }

    top.appendChild(dayNumber);
    top.appendChild(markerColumn);
    button.appendChild(top);
    button.appendChild(scheduleColumn);

    button.addEventListener("click", () => {
      selectedDateKey = dateKey;
      renderCalendar();
      openDaySheet(dateKey);
    });

    el.calendarGrid.appendChild(button);
  }

  const totalCells = leadingBlanks + totalDays;
  const trailingBlanks = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let index = 0; index < trailingBlanks; index += 1) {
    el.calendarGrid.appendChild(createBlankCalendarCell());
  }
}

function renderDaySheet() {
  el.selectedDateLabel.textContent = selectedDateKey ? formatDateLabel(selectedDateKey) : TEXT.tapDatePrompt;
  const entries = selectedDateKey ? getEntriesForDate(selectedDateKey) : [];
  el.selectedDateSummary.textContent = entries.length ? `${entries.length} ${TEXT.recordsUnit}` : TEXT.tapDatePrompt;
  renderDayHabitButtons();
  renderDayEntries(entries);
}

function renderDayHabitButtons() {
  const habits = getActiveHabits();
  el.dayHabitButtons.innerHTML = "";

  if (!habits.length) {
    appendEmptyMessage(el.dayHabitButtons, TEXT.addHabitFirst);
    return;
  }

  habits.forEach((habit) => {
    const button = document.createElement("button");
    const marker = document.createElement("span");
    const label = document.createElement("span");

    button.type = "button";
    button.className = "sheet-habit-button";
    applyHabitMarkerStyle(marker, habit, "small");
    label.textContent = habit.name;
    button.appendChild(marker);
    button.appendChild(label);
    button.addEventListener("click", () => {
      recordCheckin(habit.id, el.dayCheckinNoteInput.value.trim(), selectedDateKey);
      el.dayCheckinNoteInput.value = "";
      renderDaySheet();
      renderStats();
      renderHabitGrid();
      renderCalendar();
      showToast(TEXT.checkedIn);
    });

    el.dayHabitButtons.appendChild(button);
  });
}

function renderDayEntries(entries) {
  el.selectedDateList.innerHTML = "";

  if (!entries.length) {
    appendEmptyMessage(el.selectedDateList, selectedDateKey ? TEXT.noDayEntries : TEXT.tapDatePrompt);
    return;
  }

  entries.forEach((entry) => {
    const fragment = el.detailItemTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".detail-item");
    const type = fragment.querySelector(".detail-type");
    const title = fragment.querySelector(".schedule-title");
    const date = fragment.querySelector(".schedule-date");
    const note = fragment.querySelector(".schedule-note");
    const actions = fragment.querySelector(".detail-actions");

    if (entry.kind === "schedule" && entry.done) {
      card.classList.add("is-done");
    }

    type.textContent = entry.kind === "checkin" ? TEXT.checkinType : TEXT.scheduleType;
    type.className = `detail-type${entry.kind === "checkin" ? " is-checkin" : " is-schedule"}`;
    title.textContent = entry.title;
    date.textContent = entry.timeLabel;
    note.textContent = entry.note || TEXT.noNote;

    if (entry.kind === "checkin") {
      actions.appendChild(createActionButton(TEXT.delete, "button-danger", () => {
        deleteCheckin(entry.id);
      }));
    } else {
      actions.appendChild(createActionButton(entry.done ? TEXT.restoreTodo : TEXT.markDone, "button-ghost", () => {
        toggleSchedule(entry.id);
      }));
      actions.appendChild(createActionButton(TEXT.delete, "button-danger", () => {
        deleteSchedule(entry.id);
      }));
    }

    el.selectedDateList.appendChild(fragment);
  });
}

function renderSelectors() {
  renderColorSelector();
  renderShapeSelector();
}

function renderColorSelector() {
  el.colorSelector.innerHTML = "";

  HABIT_COLORS.forEach((color) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `selector-button color-choice${color.id === selectedColorId ? " is-selected" : ""}`;
    button.style.setProperty("--choice-color", color.value);
    button.title = color.label;
    button.addEventListener("click", () => {
      selectedColorId = color.id;
      renderColorSelector();
      renderShapeSelector();
    });
    el.colorSelector.appendChild(button);
  });
}

function renderShapeSelector() {
  el.shapeSelector.innerHTML = "";

  HABIT_SHAPES.forEach((shape) => {
    const button = document.createElement("button");
    const marker = document.createElement("span");
    const label = document.createElement("span");
    button.type = "button";
    button.className = `selector-button shape-choice${shape.id === selectedShapeId ? " is-selected" : ""}`;
    applyMarkerPrimitive(marker, shape.id, getColorById(selectedColorId).value, "small");
    label.textContent = shape.label;
    button.appendChild(marker);
    button.appendChild(label);
    button.addEventListener("click", () => {
      selectedShapeId = shape.id;
      renderShapeSelector();
    });
    el.shapeSelector.appendChild(button);
  });
}

function openHabitModal() {
  el.habitModal.hidden = false;
}

function closeHabitModal() {
  el.habitModal.hidden = true;
  el.habitForm.reset();
  selectedColorId = HABIT_COLORS[0].id;
  selectedShapeId = HABIT_SHAPES[0].id;
  renderSelectors();
}

function openDaySheet(dateKey) {
  selectedDateKey = dateKey;
  renderDaySheet();
  switchToPage(1);
  el.daySheet.hidden = false;
}

function closeDaySheet() {
  el.daySheet.hidden = true;
  el.dayScheduleForm.reset();
  el.dayCheckinNoteInput.value = "";
}

function createHabit() {
  const name = el.habitNameInput.value.trim();
  if (!name) {
    return;
  }

  state.habits.push({
    id: createId(),
    name,
    target: el.habitTargetInput.value.trim(),
    colorId: selectedColorId,
    shapeId: selectedShapeId,
    createdAt: new Date().toISOString(),
    archived: false,
    lastCheckedAt: "",
  });

  saveState();
  closeHabitModal();
  render();
  showToast(TEXT.addedHabit);
}

function createScheduleForSelectedDate() {
  if (!selectedDateKey) {
    return;
  }

  const title = el.dayScheduleTitleInput.value.trim();
  if (!title) {
    return;
  }

  state.schedules.push({
    id: createId(),
    title,
    date: selectedDateKey,
    time: el.dayScheduleTimeInput.value,
    note: el.dayScheduleNoteInput.value.trim(),
    done: false,
    createdAt: new Date().toISOString(),
  });

  saveState();
  el.dayScheduleForm.reset();
  renderDaySheet();
  renderStats();
  renderCalendar();
  showToast(TEXT.addedSchedule);
}

function recordCheckin(habitId, note, dateKey) {
  const habit = state.habits.find((item) => item.id === habitId && !item.archived);
  if (!habit) {
    alert(TEXT.addHabitFirst);
    return;
  }

  const createdAt = composeCheckinDate(dateKey || getDateKey(new Date()));
  state.checkins.unshift({
    id: createId(),
    habitId,
    note,
    createdAt,
  });
  habit.lastCheckedAt = createdAt;
  selectedDateKey = getDateKey(new Date(createdAt));
  calendarCursor = new Date(new Date(createdAt).getFullYear(), new Date(createdAt).getMonth(), 1);

  saveState();
}

function composeCheckinDate(dateKey) {
  const now = new Date();
  const base = new Date(`${dateKey}T00:00:00`);
  const hours = now.getHours();
  const minutes = now.getMinutes();
  base.setHours(hours, minutes, 0, 0);
  return base.toISOString();
}

function deleteHabit(habitId) {
  state.habits = state.habits.filter((item) => item.id !== habitId);
  state.checkins = state.checkins.filter((item) => item.habitId !== habitId);
  saveState();
  render();
}

function deleteCheckin(id) {
  if (!window.confirm(TEXT.deleteCheckinConfirm)) {
    return;
  }

  state.checkins = state.checkins.filter((item) => item.id !== id);
  refreshHabitLastCheckedAt();
  saveState();
  render();
  renderDaySheet();
}

function toggleSchedule(id) {
  const schedule = state.schedules.find((item) => item.id === id);
  if (!schedule) {
    return;
  }

  schedule.done = !schedule.done;
  saveState();
  render();
  renderDaySheet();
}

function deleteSchedule(id) {
  if (!window.confirm(TEXT.deleteScheduleConfirm)) {
    return;
  }

  state.schedules = state.schedules.filter((item) => item.id !== id);
  saveState();
  render();
  renderDaySheet();
}

function getDateSummary(dateKey) {
  const habitIds = new Set(
    state.checkins
      .filter((entry) => getDateKey(new Date(entry.createdAt)) === dateKey)
      .map((entry) => entry.habitId)
  );

  return {
    markers: [...habitIds]
      .map((habitId) => state.habits.find((habit) => habit.id === habitId))
      .filter(Boolean),
    schedules: state.schedules.filter((entry) => entry.date === dateKey),
  };
}

function getEntriesForDate(dateKey) {
  const checkins = state.checkins
    .filter((entry) => getDateKey(new Date(entry.createdAt)) === dateKey)
    .map((entry) => ({
      kind: "checkin",
      id: entry.id,
      title: getHabitName(entry.habitId),
      note: entry.note,
      timeLabel: formatDateTime(entry.createdAt),
      sortValue: new Date(entry.createdAt).getTime(),
    }));

  const schedules = state.schedules
    .filter((entry) => entry.date === dateKey)
    .map((entry) => ({
      kind: "schedule",
      id: entry.id,
      title: entry.title,
      note: entry.note,
      timeLabel: entry.time ? `${entry.time} ${entry.done ? TEXT.scheduleDone : TEXT.scheduleTodo}` : (entry.done ? TEXT.scheduleDone : TEXT.scheduleTodo),
      sortValue: new Date(`${entry.date}T${entry.time || "23:59"}:00`).getTime(),
      done: entry.done,
    }));

  return [...checkins, ...schedules].sort((left, right) => left.sortValue - right.sortValue);
}

function getHabitName(habitId) {
  const habit = state.habits.find((item) => item.id === habitId);
  return habit ? habit.name : TEXT.defaultHabitName;
}

function getActiveHabits() {
  return [...state.habits]
    .filter((item) => !item.archived)
    .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
}

function countHabitCheckins(habitId) {
  return state.checkins.filter((entry) => entry.habitId === habitId).length;
}

function countCheckinsWithinDays(days) {
  const threshold = new Date();
  threshold.setHours(0, 0, 0, 0);
  threshold.setDate(threshold.getDate() - (days - 1));
  return state.checkins.filter((entry) => new Date(entry.createdAt) >= threshold).length;
}

function refreshHabitLastCheckedAt() {
  state.habits.forEach((habit) => {
    const latest = state.checkins
      .filter((entry) => entry.habitId === habit.id)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))[0];
    habit.lastCheckedAt = latest ? latest.createdAt : "";
  });
}

function applyHabitMarkerStyle(element, habit, size) {
  const color = getColorById(habit.colorId);
  const shapeId = habit.shapeId || HABIT_SHAPES[0].id;
  element.className = "habit-primitive";
  applyMarkerPrimitive(element, shapeId, color.value, size);
}

function applyMarkerPrimitive(element, shapeId, colorValue, size) {
  element.className = `habit-primitive is-${shapeId} is-${size}`;
  element.style.setProperty("--habit-color", colorValue);
}

function getColorById(colorId) {
  return HABIT_COLORS.find((item) => item.id === colorId) || HABIT_COLORS[0];
}

function createBlankCalendarCell() {
  const blank = document.createElement("div");
  blank.className = "calendar-cell calendar-cell-blank";
  return blank;
}

function createActionButton(label, variantClass, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `button button-small ${variantClass}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function appendEmptyMessage(container, message) {
  const empty = document.createElement("div");
  empty.className = "list-empty";
  empty.textContent = message;
  container.appendChild(empty);
}

function formatDateTime(value) {
  return DATETIME_FORMATTER.format(new Date(value));
}

function formatDateLabel(dateKey) {
  return DATE_FORMATTER.format(new Date(`${dateKey}T00:00:00`));
}

function exportState() {
  const dateKey = getDateKey(new Date());
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `checkin-backup-${dateKey}.json`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
}

function importState(event) {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result));
      state = normalizeState(imported);
      saveState();
      render();
      renderDaySheet();
      el.importFileInput.value = "";
      alert(TEXT.importSuccess);
    } catch (error) {
      el.importFileInput.value = "";
      alert(TEXT.importFailed);
    }
  };
  reader.readAsText(file);
}

function loadState() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      return normalizeState(JSON.parse(current));
    }

    for (const key of LEGACY_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        return normalizeState(JSON.parse(raw));
      }
    }

    return normalizeState({});
  } catch (error) {
    return normalizeState({});
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeState(input) {
  const habits = Array.isArray(input.habits) ? input.habits.map(normalizeHabit) : [];
  const checkins = Array.isArray(input.checkins) ? input.checkins.map(normalizeCheckin) : [];
  const schedules = Array.isArray(input.schedules) ? input.schedules.map(normalizeSchedule) : [];

  if (habits.length || checkins.length) {
    return { habits, checkins, schedules };
  }

  return migrateLegacyData(input);
}

function normalizeHabit(item) {
  return {
    id: item.id || createId(),
    name: item.name || TEXT.defaultHabitName,
    target: item.target || "",
    colorId: item.colorId || HABIT_COLORS[0].id,
    shapeId: item.shapeId || HABIT_SHAPES[0].id,
    createdAt: item.createdAt || new Date().toISOString(),
    archived: Boolean(item.archived),
    lastCheckedAt: item.lastCheckedAt || "",
  };
}

function normalizeCheckin(item) {
  return {
    id: item.id || createId(),
    habitId: item.habitId || "",
    note: item.note || "",
    createdAt: item.createdAt || new Date().toISOString(),
  };
}

function normalizeSchedule(item) {
  return {
    id: item.id || createId(),
    title: item.title || "",
    date: item.date || getDateKey(new Date()),
    time: item.time || "",
    note: item.note || "",
    done: Boolean(item.done),
    createdAt: item.createdAt || new Date().toISOString(),
  };
}

function migrateLegacyData(input) {
  const schedules = Array.isArray(input.schedules) ? input.schedules.map(normalizeSchedule) : [];
  if (!input.checkins || typeof input.checkins !== "object") {
    return { habits: [], checkins: [], schedules };
  }

  const habitId = createId();
  const habits = [{
    id: habitId,
    name: TEXT.migratedHabitName,
    target: TEXT.migratedHabitTarget,
    colorId: HABIT_COLORS[0].id,
    shapeId: HABIT_SHAPES[0].id,
    createdAt: new Date().toISOString(),
    archived: false,
    lastCheckedAt: "",
  }];

  const checkins = Object.entries(input.checkins)
    .filter(([, value]) => value && value.completed)
    .map(([dateKey, value]) => ({
      id: createId(),
      habitId,
      note: value.note || "",
      createdAt: new Date(`${dateKey}T09:00:00`).toISOString(),
    }))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));

  habits[0].lastCheckedAt = checkins[0]?.createdAt || "";
  return { habits, checkins, schedules };
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  el.toast.textContent = message;
  el.toast.hidden = false;
  toastTimer = window.setTimeout(() => {
    el.toast.hidden = true;
  }, 1400);
}

function switchToPage(index) {
  const width = el.pages.clientWidth;
  el.pages.scrollTo({
    left: width * index,
    behavior: "smooth",
  });
  updatePageTabs(index);
}

function syncPageSwitcher() {
  const width = el.pages.clientWidth || 1;
  const index = Math.round(el.pages.scrollLeft / width);
  updatePageTabs(index);
}

function updatePageTabs(activeIndex) {
  el.pageSwitcher.querySelectorAll("[data-page-index]").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.pageIndex) === activeIndex);
  });
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // 忽略注册失败，页面主体仍然可用。
    });
  });
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getInstallHint() {
  if (window.location.protocol === "file:") {
    return TEXT.installFileMode;
  }

  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) {
    return TEXT.installIos;
  }

  if (/android/.test(ua)) {
    return TEXT.installAndroid;
  }

  return TEXT.installGeneric;
}
