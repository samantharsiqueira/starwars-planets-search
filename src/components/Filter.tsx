import React, { useState, useContext, Dispatch } from "react";
import PlanetsContext from "../context/PlanetsContext";
import { Planets, FiltersTypes } from "../types/types";

export default function Filter(

    FilterProps: {
        setFilters: Dispatch<React.SetStateAction<Planets>>,
        state: FiltersTypes,
        setState: (state: FiltersTypes) => void,
        tags: KeyType[],
    }){
    const { setFilters, state, setState, tags } = FilterProps;
    }
    return (
        <form>
         <select
        name="tag"
        data-testid="column-filter"
        value={ state.tag }
        onChange={ ({ target }) => setState({ ...state, [target.name]: target.value }) }
      >
        {tags
          .map((value) => (<option key={ value } value={ value }>{value}</option>))}
      </select>

        </form>
    );}