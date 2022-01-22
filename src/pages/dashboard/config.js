import dayjs from "dayjs";
import zhCN from "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

import { IconButton } from "@mui/material";
import { DeleteOutlineTwoTone } from "@mui/icons-material";

dayjs.locale(zhCN);
dayjs.extend(relativeTime);

export const columns = [
  {
    title: "编号",
    index: "id",
  },
  {
    title: "目录",
    index: "category",
  },
  {
    title: "状态",
    index: "status",
  },
  {
    title: "启动时间",
    index: "startAt",
    render: (value) => dayjs(value).toNow(),
  },
];
