import styled from "styled-components"
export default function Loader() {
    return(
        <Wrapper>
        <div class="loading">
            <span class="blob1 blob"></span>
            <span class="blob2 blob"></span>
            <span class="blob3 blob"></span>
        </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
.loading {
	height: 30px;
	width: 100px;
}

.blob {
	border-radius: 50%;
	background-color: black;
	display: block;
	float: left;
	margin: 5px 2px;
	position: relative;
	top: 5px;
	height: 20px;
	width: 20px;

	-webkit-animation: loading-blob 1.2s infinite;
	-moz-animation:    loading-blob 1.2s infinite;
	-o-animation:      loading-blob 1.2s infinite;
	animation:         loading-blob 1.2s infinite;

	-webkit-animation-timing-function: ease-in-out;
	-moz-animation-timing-function: ease-in-out;
	-ms-animation-timing-function: ease-in-out;
	-o-animation-timing-function: ease-in-out;
	animation-timing-function: ease-in-out;

	-webkit-transform: translate3d(0, 0, 0);
	-moz-transform: translate3d(0, 0, 0);
	-ms-transform: translate3d(0, 0, 0);
	-o-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}

@-webkit-keyframes loading-blob {
	0% { height: 20px; top: 5px; width: 20px; }
	25% { height: 30px; top: 0; width: 30px; }
	50% { height: 20px; top: 5px; width: 20px; }
	100% { height: 20px; width: 20px; }
}

@-moz-keyframes loading-blob {
	0% { height: 20px; top: 5px; width: 20px; }
	25% { height: 30px; top: 0; width: 30px; }
	50% { height: 20px; top: 5px; width: 20px; }
	100% { height: 20px; width: 20px; }
}

@-o-keyframes loading-blob {
	0% { height: 20px; top: 5px; width: 20px; }
	25% { height: 30px; top: 0; width: 30px; }
	50% { height: 20px; top: 5px; width: 20px; }
	100% { height: 20px; width: 20px; }
}

@keyframes loading-blob {
	0% { height: 20px; top: 5px; width: 20px; }
	25% { height: 30px; top: 0; width: 30px; }
	50% { height: 20px; top: 5px; width: 20px; }
	100% { height: 20px; width: 20px; }
}

.blob2 {
	-webkit-animation-delay: 150ms;
	-moz-animation-delay: 150ms;
	-o-animation-delay: 150ms;
	animation-delay: 150ms;
}

.blob3 {
	-webkit-animation-delay: 300ms;
	-moz-animation-delay: 300ms;
	-o-animation-delay: 300ms;
	animation-delay: 300ms;
}
`