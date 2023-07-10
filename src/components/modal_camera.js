import {Button, Modal, Grid, Spacer, Text} from "@nextui-org/react";
import Webcam from "react-webcam";
import {useCallback, useRef} from "react";
import {Teko} from "next/dist/compiled/@next/font/dist/google";

export default function ModalCamera({
                                        showTakePhotoDialog,
                                        setShowTakePhotoDialog,
                                        setImageSource
                                    }) {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSource(imageSrc);
    }, [webcamRef]);

    return (<Modal open={showTakePhotoDialog} onClose={() => {
        setShowTakePhotoDialog(false);
    }}>
        <Modal.Body css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text h2> Take a photo </Text>
            <Webcam videoConstraints={{
                width: 250,
                height: 250,
            }} width={250} height={250} screenshotFormat="image/jpeg" audio={false} ref={webcamRef} style={{
                borderRadius: 20,
            }}/>
            <Grid.Container direction="row" justify="center" alignItems="center">
                <Button auto onPress={() => {
                    setShowTakePhotoDialog(false);
                }} color="error"> Cancel </Button>
                <Spacer x={1}/>
                <Button color="success" auto onPress={() => {
                    capture();
                    setShowTakePhotoDialog(false);
                }
                }> Take photo </Button>
            </Grid.Container>
        </Modal.Body>
    </Modal>);
}