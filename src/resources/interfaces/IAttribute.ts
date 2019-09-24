import { ReactElement } from 'react';
import { IResource } from './IResource';

export enum IAttributeType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Number = 'number',
  Select = 'select',
  TextArea = 'textarea',
  Boolean = 'boolean',
  Divider = 'divider',
  Image = 'image',
  Element = 'element',
}

export enum ActionType {
  CREATE,
  UPDATE,
}

export type AttributeColumnWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;

export interface IAttribute {
  type: IAttributeType,
  name: string;
  displayName?: string;
  helpText?: string;
  value?: any,
  originalValue?: any;
  required?: boolean;
  error?: boolean;
  visible?: ActionType[] | undefined;
  readOnly?: ActionType[] | undefined;
  columnWidth?: AttributeColumnWidth;
}

export interface ICollectionAttributeOption {
  key: string;
  value: any;
}

export interface ICollectionAttribute extends IAttribute {
  options: ICollectionAttributeOption[];
  multiple: boolean;
  arrayValue?: any[];
}

export interface IBooleanAttribute extends IAttribute {
  onChange?: (checked: boolean) => Promise<any>;
}

export interface IDividerAttribute extends IAttribute {
  label?: string;
}

export interface IImageAttribute extends IAttribute {
  width: number;
  height: number;
  src?: string;
  pendingSrc?: string;
  pendingFile?: File;
}

export interface IElementAttribute extends IAttribute {
  render: (attr: IElementAttribute, resource: IResource) => ReactElement<any>;
}