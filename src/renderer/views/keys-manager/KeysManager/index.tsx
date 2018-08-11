import { observer } from 'mobx-react';
import React from 'react';

import Store from '../../../store';
import { PageContent } from '../../app/Menu/styles';
import Dialog from '../Dialog';
import Key from '../Key';
import {
  Container, Table, HeadRow, HeadItem, BodyRow, BodyItem,
} from './styles';

@observer
export default class KeysManager extends React.Component {
  public onKeyClick = (element?: Key) => {
    const { keyBinding } = element.props;

    Store.keysDialogVisible = true;
  };

  public render() {
    return (
      <PageContent>
        <Container>
          <Table>
            <thead>
              <HeadRow>
                <HeadItem>Command</HeadItem>
                <HeadItem>Keybinding</HeadItem>
                <HeadItem>Source</HeadItem>
              </HeadRow>
            </thead>
            <tbody>
              {Store.keyBindings.map((data, key) => (
                <BodyRow key={key}>
                  <BodyItem>{data.command}</BodyItem>
                  <BodyItem>
                    {(typeof data.key === 'object' && <Key>...</Key>) || (
                      <Key keyBinding={data} onClick={this.onKeyClick} />
                    )}
                  </BodyItem>
                  <BodyItem>{data.isChanged ? 'User' : 'Default'}</BodyItem>
                </BodyRow>
              ))}
            </tbody>
          </Table>
          <Dialog />
        </Container>
      </PageContent>
    );
  }
}