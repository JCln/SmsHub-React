import { connect } from "react-redux";

import { incrementValue } from "../actions";
import TableOutputs from "../components/table-outputs";

const mapStateToProps = (state) => { return state };

const mapDispatchToProps = dispatch => {
    return {
        increment() {
            dispatch(incrementValue());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableOutputs);