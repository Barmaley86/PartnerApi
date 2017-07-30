import { ApiUrls } from './api.config.interfaces';

export const API_URLS: ApiUrls = {
  ROOT: 'https://api.newstube.ru/dev',
  MEDIA_CHANNELS: '/Media/Channels',
  MEDIA_GET_MEDIA: '/Media/GetMedia',
  MEDIA_IMPORT_MEDIAS_PAGE_COUNT: '/Media/ImportMediasPageCount',
  MEDIA_IMPORT_MEDIAS_PAGE: '/Media/ImportMediasPage',
  MEDIA_MEDIA_ADD:'/Media/MediaAdd',
  MEDIA_MEDIA_UPDATE: '/Media/MediaUpdate',
  MEDIA_MEDIA_BLOCK: '/Media/MediaBlock',
  MEDIA_MEDIA_UNBLOCK: '/Media/MediaUnblock',
  VIDEO_UPLOAD_START: '/VideoUpload/Start',
  VIDEO_UPLOAD_UPLOAD:'/VideoUpload/Upload',
  VIDEO_UPLOAD_COMPLETE: '/VideoUpload/Complete'
};