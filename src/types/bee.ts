import * as CSS from 'csstype'

export interface IBeeLoader {
  beePluginUrl: string,
  authUrl: string
}

export interface IUrlConfig {
  authUrl: string,
  beePluginUrl: string
}

export interface IBeeOptions {
  shared?: boolean
}

export interface IGetTokenPayload {
  clientId: string,
  clientSecret: string
}

export enum StageModeOptions {
  DESKTOP = 'desktop',
  MOBILE = 'mobile'
}

export enum StageDisplayOptions {
  BLUR = 'blur',
  HIDE = 'hide'
}

export interface ILoadStageMode {
  mode: StageModeOptions,
  display: StageDisplayOptions
}

export interface ILoadConfig {
  [key: string]: unknown;
}

export enum LoadWorkspaceOptions {
  DEFAULT = 'default',
  MIXED = 'mixed',
  AMP_ONLY = 'amp_only',
  HTML_ONLY = 'html_only'
}

export type BeePluginError = {
  code?: number
  detail?: string
  message: string
}

type CSSProperties = CSS.Properties<string | number>

export interface ISavedRow {
  category: number | { name: string }
  content_html?: string
  content_json: JSON
  dateCreated?: string
  dateModified?: string
  description: string
  idParent: number | null
  name: string
  slug: string
  thumb_large?: string
  thumb_medium?: string
  thumb_small?: string
  uuid: string
}

export interface IPluginRow {
  columns: unknown[]
  container: {
    style: CSSProperties
  }
  content: unknown
  locked: boolean
  metadata: ISavedRow
  type: string
  uuid: string
}

export interface IPluginForm {
  structure: {
    attributes: Record<string, unknown>
    fields: Record<string, unknown>
    layout: unknown[]
    title: string
    description: string
  }
}

export interface IPluginFilePicker {
  url: string
}

export enum EngageHandle {
  MDM = 'mdm',
}

export type BeePluginEngageDialogHandler = (
  resolve: () => void,
  reject: () => void,
  handle: EngageHandle
) => Promise<void>


export type BeePluginContentDialogHandler<K> = (
  resolve: (data: K) => void,
  reject: () => void,
  args: K
) => Promise<void>

export type BeePluginConfigurationsHooks = {
  getMentions?: {
    handler: BeePluginContentDialogHandler<any> // Todo type with onMention payload
  }
}

export enum OnCommentChangeEnum {
  NEWCOMMENT = 'NEW_COMMENT',
  DELETECOMMENT = 'COMMENT_DELETED',
  CHANGECOMMENT = 'COMMENT_EDITED',
}

export type BeePluginCommentPayload = {
  author: {
    userHandle: string
    username: string
    userColor: string
  }
  content: string
  elementId: string
  mentions: string[]
  parentCommentId: string
  responses: string[]
  timestamp: string
}

export type BeePluginOnCommentChangePayload = {
  type: OnCommentChangeEnum
  payload: {
    commentId: string
    comment: BeePluginCommentPayload
  }
}

export type BeePluginOnCommentPayload = {
  change: BeePluginOnCommentChangePayload
  comments: unknown
}

export interface IMergeTag {
  name: string
  value: string
  id?: number
}
export interface IMergeContent {
  name: string
  value: string
  id?: number
}

export interface ISpecialLink {
  label: string
  link: string
  type: string
  id?: number
}

export type BeePluginAdvancedPermissionStageToggle = {
  locked: boolean
  engage: {
    enabled: boolean
    handle: EngageHandle.MDM
    tooltip?: string
  }
}

export type BeePluginAdvancedPermission = {
  rows: {
    displayConditions: {
      show: boolean
      locked: boolean
    }
  }
  workspace: {
    stageToggle: BeePluginAdvancedPermissionStageToggle
  }
}

export enum WorkspaceStage {
  desktop = 'desktop',
  mobile = 'mobile',
  global = 'global',
}

export type BeePluginWorkspace = {
  type: LoadWorkspaceOptions
  stage: WorkspaceStage
  displayHidden: StageDisplayOptions
  hideStageToggle: boolean
}

export type IPluginSessionInfo = {
  sessionId: string
}

export interface IEntityContentJson {
  page: {
    body: unknown
    description: string
    rows: unknown[]
    template: {
      name: string
      type: string
      version: string
    }
    title: string
  }
}

export type BeePluginMessageEditDetailPatch = {
  op: string
  path: string
  value: string
}

export type BeePluginMessageEditDetail = {
  code: unknown
  value: string
  description: string
  patches: BeePluginMessageEditDetailPatch[]
}


export interface IBeeConfig {
  uid: string
  container: string
  trackChanges?: boolean
  preventClose?: boolean
  enable_display_conditions?: boolean
  language: string
  mergeTags?: IMergeTag[]
  mergeContents?: IMergeContent[]
  specialLinks?: ISpecialLink[]
  username?: string
  userColor?: string
  userHandle?: string
  commenting?: boolean
  advancedPermissions?: BeePluginAdvancedPermission
  defaultForm?: unknown
  loadingSpinnerTheme?: string
  loadingSpinnerDisableOnSave?: boolean
  editorFonts?: unknown
  roleHash?: string
  defaultColors?: string[]
  contentDefaults?: unknown
  customCss?: string
  workspace?: BeePluginWorkspace
  autosave?: number,
  saveRows?: boolean,
  contentDialog?: {
    engage?: {
      handler: BeePluginEngageDialogHandler
    },
    saveRow?: {
      label: string
      handler: BeePluginContentDialogHandler<IPluginRow>
    }
    manageForm?: {
      label: string
      handler: BeePluginContentDialogHandler<IPluginForm>
    },
    filePicker?: {
      label: string
      handler: BeePluginContentDialogHandler<IPluginFilePicker>
    }
  },
  rowsConfiguration?: Record<string, unknown>
  hooks?: BeePluginConfigurationsHooks
  onLoad: () => void
  onPreview?: () => void
  onTogglePreview?: () => void
  onSessionStarted?: (sessionInfo: IPluginSessionInfo) => void
  onSessionChange?: (sessionInfo: IPluginSessionInfo) => void
  onReady?: (args: Record<string, unknown>) => void
  onSave?: (jsonFile: unknown, htmlFile: unknown) => void
  onSaveRow?: (jsonfile: unknown, html: string) => void
  onError: (error: BeePluginError) => void
  onAutoSave?: (json: string) => void
  onSaveAsTemplate?: (json: Record<string, unknown>) => void
  onSend?: (html: string) => void
  onChange?: (json: string, detail: BeePluginMessageEditDetail, version: number) => void
  onWarning?: (a: unknown, b: unknown,) => void
  onComment?: (commentPayload: BeePluginOnCommentPayload, json: string) => void
}