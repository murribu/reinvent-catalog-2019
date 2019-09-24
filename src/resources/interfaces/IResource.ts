import { IAttribute } from './IAttribute';

export interface IResource {
  id?: string;
  signature: string;
  attributes: IAttribute[];

  initialize(): any;
  save(): Promise<IResource>;
  delete(): Promise<any>;
  getSaveMessage(apiResponse: any): string | JSX.Element;
  toData(): any;
}

export default IResource;