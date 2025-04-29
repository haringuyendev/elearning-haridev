import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import getApiUrl from '../../utils/getApiUrl';

// Create class
export const createClassThunk = createAsyncThunk(
  "class/create",
  async ({ instructor, startDate, endDate, courseId, duration, participant, userId }: {
    instructor: any;
    startDate: any;
    endDate: any;
    courseId: any;
    duration: any;
    participant: any;
    userId: any;
  }) => {
    const response = await fetch(getApiUrl() + "e-class/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instructor, startDate, endDate, courseId, duration, participant, userId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to create Class");
    return data;
  }
);

// Edit class
export const editClassThunk = createAsyncThunk(
  "class/edit",
  async ({ id, instructor, startDate, endDate, courseId, duration, participant, userId }: {
    id: any;
    instructor: any;
    startDate: any;
    endDate: any;
    courseId: any;
    duration: any;
    participant: any;
    userId: any;
  }) => {
    const response = await fetch(getApiUrl() + "e-class/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, instructor, startDate, endDate, courseId, duration, participant, userId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to update Class");
    return data;
  }
);

// Delete class
export const deleteClassThunk = createAsyncThunk(
  "class/delete",
  async (classId: any) => {
    const response = await fetch(getApiUrl() + "e-class/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to delete Class");
    
    toast.success("Class deleted successfully!");
    return classId;
  }
);

// Get all classes
export const getClassThunk = createAsyncThunk(
  "class/getAll",
  async ({ page = 1, limit = 10, status = null, course = null, instructor = null, search = null }: {
    page?: number;
    limit?: number;
    status?: string | null;
    course?: string | null;
    instructor?: string | null;
    search?: string | null;
  }) => {
    let url = `${getApiUrl()}e-class/all?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    if (course) url += `&course=${course}`;
    if (instructor) url += `&instructor=${instructor}`;
    if (search) url += `&search=${search}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch class");
    return data;
  }
);

// Get enrolled classes
export const getEnrollClassThunk = createAsyncThunk(
  "class/getEnrolled",
  async ({ userId, status, page = 1, limit = 10, search = "" }: {
    userId: any;
    status: any;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    let url = `${getApiUrl()}e-class/get-enroll-class?userId=${userId}&status=${status}&page=${page}&limit=${limit}`;
    if (search) url += `&search=${search}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch Enroll class");
    return data;
  }
);

// Update class status
export const updateClassStatusThunk = createAsyncThunk(
  "class/updateStatus",
  async () => {
    const response = await fetch(`${getApiUrl()}e-class/update-class`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to update class");
    const data = await response.json();
    return data;
  }
);

// Join class
export const joinClassThunk = createAsyncThunk(
  "class/join",
  async ({ classId, userId }: { classId: any; userId: any }) => {
    const response = await fetch(
      `${getApiUrl()}e-class-check/join-class?classId=${classId}&userId=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to join class");
    return data;
  }
);

// Mark learn as done
export const markLearnDoneThunk = createAsyncThunk(
  "class/markDone",
  async ({ classId, courseId, quizId, sectionId, userId }: {
    classId: any;
    courseId: any;
    quizId: any;
    sectionId: any;
    userId: any;
  }) => {
    const response = await fetch(`${getApiUrl()}e-class-check/mark-done`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId, courseId, quizId, sectionId, userId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to mark done");
    return data;
  }
);

// Get check process
export const getCheckProcessThunk = createAsyncThunk(
  "class/checkProcess",
  async ({ classId, userId }: { classId: any; userId: any }) => {
    const response = await fetch(
      `${getApiUrl()}e-class-check/get-class-by-user?classId=${classId}&userId=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to check process");
    return data;
  }
);

// Get detail result
export const getDetailResultThunk = createAsyncThunk(
  "class/detailResult",
  async ({ classId, userId }: { classId: any; userId: any }) => {
    const response = await fetch(
      `${getApiUrl()}e-course-quiz/get-detail-result?classId=${classId}&userId=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error("Failed detail result");
    return data;
  }
);

// Get quiz to mark
export const getQuizToMarkThunk = createAsyncThunk(
  "class/quizToMark",
  async (classId: any) => {
    const response = await fetch(
      `${getApiUrl()}e-class/get-data-to-mark?classId=${classId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch data to mark");
    return data;
  }
);

// Get by prev class
export const getByPrevClassThunk = createAsyncThunk(
  "class/byPrevClass",
  async (classId: any) => {
    const response = await fetch(
      `${getApiUrl()}e-class/get-by-prev-class?classId=${classId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch data by prev");
    return data;
  }
);

// Get mark
export const getMarkThunk = createAsyncThunk(
  "class/mark",
  async ({ resultId, quizId, userId, testId, result }: {
    resultId: any;
    quizId: any;
    userId: any;
    testId: any;
    result: string;
  }) => {
    const response = await fetch(`${getApiUrl()}e-course-quiz/mark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resultId, quizId, userId, testId, result }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to mark");
    return data;
  }
);

// Create new class
export const createNewClassThunk = createAsyncThunk(
  "class/createNew",
  async ({ classId, startDate, endDate, participant, userId }: {
    classId: any;
    startDate: any;
    endDate: any;
    participant: any;
    userId: any;
  }) => {
    const response = await fetch(`${getApiUrl()}e-class/create-new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId, startDate, endDate, participant, userId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to create new class");
    return data;
  }
);
