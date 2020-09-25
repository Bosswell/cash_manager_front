import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import Alert from "./Alert";
import Loader from "./Loader";
import InputGroup from "./InputGroup";
import Select from "react-select";
import { sortingOptions } from "../constants/recipeListOptions";
import ReactPaginate from "react-paginate";

function RecipesList(
    {
        params,
        error,
        alert,
        loading,
        handleSearchRecipe,
        handleSortingSelectChange,
        sortingWay,
        recipeListInfo,
        handlePageChange,
        setDetails
    }
) {
    return (
        <Row>
            <Col lg={12}>
                {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occurred'}/>}
                {alert && <Alert messages={alert} type={'success'} headMsg={'Success!'}/>}

                {loading && <Loader loading={loading}/>}
                <h3>Recipes list</h3>
                <div className={'list-filters'}>
                    <div className={'filters form'}>
                        <InputGroup onChange={handleSearchRecipe} name={'search'} type={'search'} placeholder={'Search ...'}/>
                    </div>
                    <div className={'sorting-select'}>
                        <Select onChange={handleSortingSelectChange} value={sortingWay} options={sortingOptions} placeholder={'Sort by'}/>
                    </div>
                </div>

                <ListGroup className={'transaction-list'} variant="flush">
                    {recipeListInfo.results.map((item) => {
                        return (
                            <ListGroup.Item key={item.id}>
                                <div
                                    className={'text-info pointer btn-link'}
                                    onClick={() => {setDetails({show: true, obj: item})}}
                                >
                                    { item.name }
                                </div>
                                <div>Created at: { item.created_at }</div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

                <ReactPaginate
                    onPageChange={handlePageChange}
                    forcePage={params.nbPage ? params.nbPage - 1 : 0}
                    disableInitialCallback={true}
                    pageCount={recipeListInfo.nbPages}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    containerClassName={'pagination justify-content-end'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    disabledClassName={'disabled'}
                    activeClassName={'active'}
                />
            </Col>
        </Row>
    )
}

export default RecipesList;