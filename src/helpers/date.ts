import _dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


export const dayjs = _dayjs;
dayjs.extend(relativeTime);
