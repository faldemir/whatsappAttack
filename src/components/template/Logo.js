import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { APP_NAME } from "constants/app.constant";

const LOGO_SRC_PATH = "/img/logo/";

const Logo = (props) => {
  const { type, mode, gutter, className, imgClass, style, logoWidth } = props;

  return (
    <div
      className={classNames("logo flex flex-row gap-2 items-center", className, gutter)}
      style={{
        ...style,
        ...{ width: logoWidth },
      }}
    >
      <img
        className={imgClass}
        src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
        alt={`${APP_NAME} logo`}
        width="60"
        height="60"
        class="object-contain mt-2"
      />
      {type !== "streamline" && (
        <span class="text-2xl font-bold tracking-wide  text-black dark:text-white">
          Argus
        </span>
      )}
    </div>
  );
};

Logo.defaultProps = {
  mode: "light",
  type: "full",
  logoWidth: "auto",
};

Logo.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]),
  type: PropTypes.oneOf(["full", "streamline"]),
  gutter: PropTypes.string,
  imgClass: PropTypes.string,
  logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Logo;
