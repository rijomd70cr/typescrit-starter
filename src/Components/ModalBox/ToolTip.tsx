import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type ToolTipProps = {
  content: string | number;
  placeholder: string | number;
  toolTipStyle: { [x: string]: string | number };
};

export const ToolTip = ({
  content,
  placeholder,
  toolTipStyle,
}: ToolTipProps) => {
  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: toolTipStyle.backgroundColor
        ? toolTipStyle.backgroundColor
        : "black",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: toolTipStyle.backgroundColor
        ? toolTipStyle.backgroundColor
        : "black",
      ...toolTipStyle,
    },
  }));

  return (
    <div>
      <BootstrapTooltip title={content}>
        <Typography color="inherit">{placeholder}</Typography>
      </BootstrapTooltip>
    </div>
  );
};
