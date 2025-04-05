import {FC} from "react";
import {RouteObject} from "react-router-dom";

export type PageType = FC & Pick<RouteObject, 'loader'>;