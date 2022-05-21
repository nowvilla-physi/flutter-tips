import { Error } from '../components/index';
import * as Strings from '../constants/strings';
import errorImage from '../../public/images/ic_404.png';

function Error404() {
    return (
        <Error
            errorCode={Strings.NOT_FOUND}
            errorMessage={Strings.NOT_FOUND_MESSAGE}
            errorImage={errorImage}
        />
    );
}

export default Error404;
