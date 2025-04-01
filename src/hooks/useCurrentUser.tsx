"use client"
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUser, getCurrentUser} from "@/redux/auth/authSlice"

export function useCurrentUser() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch]);

  return user;
}
