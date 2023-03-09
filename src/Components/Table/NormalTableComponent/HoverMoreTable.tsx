import { ToolTip } from "../../ModalBox";

type Props = {
  maxLength: number;
  data: string | number;
};

export const HoverMoreTable = ({ data, maxLength }: Props) => {
  let title = data.toString().slice(0, maxLength) + "...";
  return (
    <ToolTip
      placeholder={title}
      content={data}
      toolTipStyle={{ backgroundColor: "black", maxWidth: 500 }}
    />
  );
};
