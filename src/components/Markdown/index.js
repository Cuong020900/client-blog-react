import React from 'react';
import md from '../../libs/markdown';

const Markdown = ({ markdown }) => {
    const rawHtml = md.render(markdown);

    return (
        <div className="md-contents" dangerouslySetInnerHTML={{ __html: rawHtml }} />
    );
}

export default Markdown;