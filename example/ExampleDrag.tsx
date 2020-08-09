/**
 * Sample React Native App
 * httpss://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import {Animated, Easing, StyleSheet, Text, Image, View, Dimensions, Platform} from 'react-native'
import SortableList from 'react-native-sortable-list'

const window = Dimensions.get('window')

const data = [
    {
        isFolder: true,
        image: 'https://placekitten.com/200/240',
        text: 'Chloe',
    },
    {
        isFolder: true,
        image: 'https://placekitten.com/200/240',
        text: 'Chloe',
    },
    {
        image: 'https://placekitten.com/200/215',
        text: 'Smokey',
    },
    {
        image: 'https://placekitten.com/200/220',
        text: 'Gizmo',
    },
    {
        image: 'https://placekitten.com/220/239',
        text: 'Kitty',
    },
]
export default class Basic extends Component {
    onReleaseRow = (a) => {
        console.log('onReleaseRow', a)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>React Native Sortable List</Text>
                <SortableList
                    style={styles.list}
                    onReleaseRow={this.onReleaseRow}
                    contentContainerStyle={styles.contentContainer}
                    data={data}
                    renderRow={this._renderRow}
                />
            </View>
        )
    }

    _renderRow = (props) => {
        return <Row {...props} />
    }
}

class Row extends Component {
    constructor(props) {
        super(props)

        this._active = new Animated.Value(0)

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [
                        {
                            scale: this._active.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.1],
                            }),
                        },
                    ],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [
                        {
                            scale: this._active.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.07],
                            }),
                        },
                    ],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            }),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start()
        }
    }

    render() {
        const {data, active, activeFolder, index} = this.props
        return (
            <Animated.View style={[styles.row, this._style, {backgroundColor: activeFolder == index ? 'red' : 'white'}]}>
                <Image source={{uri: data.image}} style={styles.image} />
                <Text style={styles.text}>{data.text}</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },

    title: {
        fontSize: 20,
        paddingVertical: 20,
        color: '#999999',
    },

    list: {
        flex: 1,
    },

    contentContainer: {
        width: window.width,

        ...Platform.select({
            ios: {
                paddingHorizontal: 30,
            },

            android: {
                paddingHorizontal: 0,
            },
        }),
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,

        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: {height: 2, width: 2},
                shadowRadius: 2,
            },

            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30,
            },
        }),
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 30,
        borderRadius: 25,
    },

    text: {
        fontSize: 24,
        color: '#222222',
    },
})
