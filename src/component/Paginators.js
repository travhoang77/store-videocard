import React, { Component } from "react";
import { Pagination, PageItem } from "react-bootstrap";
import _ from "lodash";
import "../css/Paginators.css";

export default class Paginators extends Component {
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
      <Pagination>
        {pages.map((page) => (
          <PageItem
            key={page}
            active={page === currentPage ? true : false}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageItem>
        ))}
      </Pagination>
    );
  }
}
