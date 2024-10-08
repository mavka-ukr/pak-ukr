import { invoke } from "./client.js";

export type AuthT = AuthResult;

export interface AuthResult {
  "@": "Auth";
  token: string;
}

export type MeT = MeResult;

export interface MeResult {
  "@": "Me";
  account: AccountT;
  user: UserT;
}

export type AccountT = AccountResult;

export interface AccountResult {
  "@": "Account";
}

export type UserT = DeletedUserResult | UserResult;

export interface DeletedUserResult {
  "@": "DeletedUser";
  id: number;
}

export interface UserResult {
  "@": "User";
  id: number;
  name: string;
  username: string;
  avatarUrl: string | null;
}

export type PakT = DeletedPakResult | PakResult;

export interface DeletedPakResult {
  "@": "DeletedPak";
  id: number;
}

export interface PakResult {
  "@": "Pak";
  id: number;
  name: string;
  description: string;
  docsUrl: string;
  sourceUrl: string;
  version: PakVersionT | null;
  author: UserT;
  logoUrl: string | null;
}

export type PakVersionT = DeletedPakVersionResult | PakVersionResult;

export interface DeletedPakVersionResult {
  "@": "DeletedPakVersion";
  id: number;
}

export interface PakVersionResult {
  "@": "PakVersion";
  id: number;
  pakId: number;
  name: string;
  description: string;
}

export function invokeLogin(params: {
  mavkaCode: string;
  redirectUri: string;
}): Promise<AuthT> {
  return invoke<AuthT>("login", params);
}

export function invokeGetMe(params: {} = {}): Promise<MeT> {
  return invoke<MeT>("getMe", params);
}

export function invokeGetRecentUsers(params: {
  type: string;
  limit: number;
  cursorId: number | null;
}): Promise<UserT[]> {
  return invoke<UserT[]>("getRecentUsers", params);
}

export function invokeGetRecentPaks(params: {
  limit: number;
  cursorId: number | null;
}): Promise<PakT[]> {
  return invoke<PakT[]>("getRecentPaks", params);
}

export function invokeGetUserPaks(params: {
  userId: number;
  limit: number;
  cursorId: number | null;
}): Promise<PakT[]> {
  return invoke<PakT[]>("getUserPaks", params);
}

export function invokeCreatePak(params: {
  name: string;
  description: string;
  docsUrl: string;
  sourceUrl: string;
}): Promise<PakT> {
  return invoke<PakT>("createPak", params);
}

export function invokeFindPakByName(params: {
  name: string;
}): Promise<PakT | null> {
  return invoke<PakT | null>("findPakByName", params);
}

export function invokeGetPakVersions(params: {
  pakId: number;
  limit: number;
  cursorId: number | null;
}): Promise<PakVersionT[]> {
  return invoke<PakVersionT[]>("getPakVersions", params);
}

export function invokeCreatePakVersion(params: {
  pakId: number;
  name: string;
  description: string;
  fileId: number;
}): Promise<PakVersionT> {
  return invoke<PakVersionT>("createPakVersion", params);
}

export function invokeFindUserByUsername(params: {
  username: string;
}): Promise<UserT | null> {
  return invoke<UserT | null>("findUserByUsername", params);
}

export function invokeFindPakVersionByPakIdAndName(params: {
  pakId: number;
  name: string;
}): Promise<PakVersionT | null> {
  return invoke<PakVersionT | null>("findPakVersionByPakIdAndName", params);
}
