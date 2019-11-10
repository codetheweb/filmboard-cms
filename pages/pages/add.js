import React from 'react';
import {Title, Section} from 'rbx';
import Router from 'next/router';
import {withAuthSync, fetchWithAuth} from '../utils/auth';
import PageEditor from '../../components/page-editor';

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event, state) {
    event.preventDefault();

    const page = await (await fetchWithAuth('/api/pages', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })).json();

    Router.push(`/pages/${page.id}`);
  }

  render() {
    return (
      <Section>
        <Title>Add a Page</Title>
        <PageEditor onSubmit={this.handleSubmit}/>
      </Section>
    );
  }
}
export default withAuthSync(AddPage);
