/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthSignupPost {
  /** @example "dylandoe" */
  username: string;
  /** @example "dylandoe@email.com" */
  email: string;
  /** @example "Qwerty123" */
  password: string;
}

export interface AuthLoginPost {
  /** @example "dylandoe" */
  username: string;
  /** @example "Qwerty123" */
  password: string;
}

export interface Task {
  /** @format uuid */
  id: string;
  /** @example "Go to the shop" */
  name: string;
  /** @example "Buy carrot, bread and pineapple" */
  description: string | null;
  /** @format date-time */
  deadline: string | null;
  completed: boolean;
}

export interface TaskPost {
  /** @example "Go to the shop" */
  name: string;
  /** @example "Buy carrot, bread and pineapple" */
  description?: string;
  /** @format date-time */
  deadline?: string;
}

export interface TaskPatch {
  /** @example "Go to the shop" */
  name?: string;
  /** @example "Buy carrot, bread and pineapple" */
  description?: string | null;
  /** @format date-time */
  deadline?: string | null;
}

export interface TaskCompleted {
  completed: boolean;
}

export interface Error {
  message: string;
}
